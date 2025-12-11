import { Proxy } from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {HttpNoticeKey} from "db://assets/Scripts/Project/Http/API/Notices/Keys/HttpNoticeKey";
import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import {WebRequestMethods} from "db://assets/sm-ccengine-app/Engine/Http/API/Consts/WebRequestMethods";
import {BadRequestProxy} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/BadRequestProxy";
import {PendingRequest} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/PendingRequest";
import {IHttpProvider} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Providers/IHttpProvider";

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class PendingRequestProxy extends Proxy<PendingRequest[]> {
    private _queueRunning = false;
    private _provider: IHttpProvider;

    constructor(provider: IHttpProvider) {
        super([]);
        this._provider = provider;
    }

    public onRegister(): void {
        super.onRegister?.();
        this.data = [];
    }

    public onRemove(): void {
        this._queueRunning = false;
        this._provider = null!;
        super.onRemove?.();
    }

    public RetryRequest(pendingRequest: PendingRequest | undefined): void {
        if (pendingRequest) {
            this.ExecuteRequest(pendingRequest);
        }
    }

    public Request(
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form: Array<[string, string]> = [],
        onResponse?: (response: HttpResponse) => void,
        method: string = WebRequestMethods.Http.Get,
        useQueue: boolean = true,
        critical: boolean = true,
    ): void {
        if (!this._provider) return;

        const pendingRequest = new PendingRequest(method, uri, isSilent, isJson, form, onResponse, critical);

        if (useQueue) {
            this.data.push(pendingRequest);
            if (!this._queueRunning) {
                this._queueRunning = true;
                this.processQueue();
            }
        } else {
            this.ExecuteRequest(pendingRequest);
        }
    }

    private async processQueue(): Promise<void> {
        while (this.data.length > 0 && this._queueRunning) {
            const req = this.data.shift()!;
            this.ExecuteRequest(req);
            await wait(50);
        }
        this._queueRunning = false;
    }

    private ExecuteRequest(pendingRequest: PendingRequest): void {
        if (!this._provider) return;

        switch (pendingRequest.Method) {
            case WebRequestMethods.Http.Head:
                this._provider.CallHead(
                    pendingRequest.Uri,
                    pendingRequest.IsSilent,
                    pendingRequest.IsJson,
                    pendingRequest.FormFields,
                    response => this.ProcessResponse(pendingRequest, response)
                );
                break;

            case WebRequestMethods.Http.Get:
                this._provider.CallGet(
                    pendingRequest.Uri,
                    pendingRequest.IsSilent,
                    pendingRequest.IsJson,
                    pendingRequest.FormFields,
                    response => this.ProcessResponse(pendingRequest, response)
                );
                break;

            case WebRequestMethods.Http.Post:
                this._provider.CallPost(
                    pendingRequest.Uri,
                    pendingRequest.IsSilent,
                    pendingRequest.IsJson,
                    pendingRequest.FormFields,
                    response => this.ProcessResponse(pendingRequest, response)
                );
                break;

            default:
                console.error(`The request method "${pendingRequest.Method}" is unsupported`);
        }
    }

    private ProcessResponse(pendingRequest: PendingRequest, httpResponse: HttpResponse): void {
        if (!this._provider) return;

        if (this.facade.hasProxy?.(BadRequestProxy)) {
            const badRequestProxy = this.facade.getProxy?.<BadRequestProxy>(BadRequestProxy)!;

            const code = httpResponse.StatusCode;
            if (
                httpResponse.IsNetworkError ||
                code === 400 || // BadRequest
                code === 403 || // Forbidden
                code === 404 || // NotFound
                code === 408 || // RequestTimeout
                code === 500 || // InternalServerError
                code === 502 || // BadGateway
                code === 503 || // ServiceUnavailable
                code === 504    // GatewayTimeout
            ) {
                if (httpResponse.IsNetworkError && pendingRequest.CanAutoRetry()) {
                    pendingRequest.AutoRetry();
                    this.RetryRequest(pendingRequest);
                } else if (pendingRequest.IsCritical) {
                    badRequestProxy.Remove(pendingRequest);
                    badRequestProxy.Push(pendingRequest);
                    this.facade.sendNotice?.(HttpNoticeKey.InternetConnectionProblem);
                }
            }
        }

        pendingRequest.OnResponse?.(httpResponse);
    }
}
