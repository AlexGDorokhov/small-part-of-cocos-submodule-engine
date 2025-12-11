import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";

export class PendingRequest {
    private _autoRetryCount: number;

    public readonly IsSilent: boolean;
    public readonly IsJson: boolean;
    public readonly Method: string;
    public readonly Uri: string;
    public readonly FormFields?: Array<[string, string]>;
    public readonly OnResponse?: (response: HttpResponse) => void;
    public readonly IsCritical: boolean;

    constructor(
        method: string,
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form: Array<[string, string]> = [],
        onResponse?: (response: HttpResponse) => void,
        critical: boolean = true,
        autoRetryCount: number = 3
    ) {
        this.Method = method;
        this.Uri = uri;
        this.IsSilent = isSilent;
        this.IsJson = isJson;
        this.FormFields = form;
        this.OnResponse = onResponse;
        this._autoRetryCount = autoRetryCount;
        this.IsCritical = critical;
    }

    public AutoRetry(): void {
        this._autoRetryCount = this._autoRetryCount > 0 ? this._autoRetryCount - 1 : 0;
    }

    public CanAutoRetry(): boolean {
        return this._autoRetryCount > 0;
    }
}
