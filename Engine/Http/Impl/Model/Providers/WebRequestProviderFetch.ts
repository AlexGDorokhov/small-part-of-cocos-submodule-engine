import { HttpResponse } from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import { ErrorData } from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/ErrorData";
import { IHttpProvider } from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Providers/IHttpProvider";
import {WebRequestMethods} from "db://assets/sm-ccengine-app/Engine/Http/API/Consts/WebRequestMethods";
import {StringUtils} from "db://assets/sm-ccengine-app/Utils/StringUtils";

export class WebRequestProviderFetch implements IHttpProvider {

    private static readonly REQUEST_TIMEOUT = 30000;

    private static timeoutFetch(url: string, options: RequestInit, timeout: number): Promise<Response> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
            fetch(url, options)
                .then(response => {
                    clearTimeout(timer);
                    resolve(response);
                })
                .catch(err => {
                    clearTimeout(timer);
                    reject(err);
                });
        });
    }

    private static makeUri(baseUri: string, form?: Array<[string, string]>): string {
        if (!form || form.length === 0) return baseUri;
        const params = new URLSearchParams(form);
        return `${baseUri}?${params.toString()}`;
    }

    CallHead(
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form?: Array<[string, string]>,
        callback?: (response: HttpResponse) => void
    ): void {
        let headers: Record<string, string> = {};

        let formEntries = form ? [...form] : [];
        const akIndex = formEntries.findIndex(([key]) => key === 'ak');
        if (akIndex !== -1) {
            const [, akValue] = formEntries[akIndex];
            headers['ak'] = akValue;
            formEntries.splice(akIndex, 1);
        }

        const url = WebRequestProviderFetch.makeUri(uri, formEntries);

        this.request(url, {
            method: WebRequestMethods.Http.Head,
            headers
        }, isSilent, isJson, callback);
    }

    CallGet(
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form?: Array<[string, string]>,
        callback?: (response: HttpResponse) => void
    ): void {
        let headers: Record<string, string> = {};

        let formEntries = form ? [...form] : [];
        const akIndex = formEntries.findIndex(([key]) => key === 'ak');
        if (akIndex !== -1) {
            const [, akValue] = formEntries[akIndex];
            headers['ak'] = akValue;
            formEntries.splice(akIndex, 1);
        }

        const url = WebRequestProviderFetch.makeUri(uri, formEntries);

        this.request(url, {
            method: WebRequestMethods.Http.Get,
            headers: headers
        }, isSilent, isJson, callback);
    }


    CallPost(
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form?: Array<[string, string]>,
        callback?: (response: HttpResponse) => void
    ): void {
        let headers: Record<string, string> = isJson
            ? { 'Content-Type': 'application/json' }
            : { 'Content-Type': 'application/x-www-form-urlencoded' };

        let formEntries = form ? [...form] : [];

        const akIndex = formEntries.findIndex(([key]) => key === 'ak');
        if (akIndex !== -1) {
            const [, akValue] = formEntries[akIndex];
            headers['ak'] = akValue;
            formEntries.splice(akIndex, 1);
        }

        let body = '';
        if (formEntries.length > 0) {
            if (isJson) {
                const obj: Record<string, any> = {};
                for (const [key, value] of formEntries) {
                    if (StringUtils.isJsonString(value)) {
                        obj[key] = JSON.parse(value);
                    } else {
                        obj[key] = value;
                    }
                }
                body = JSON.stringify(obj);
            } else {
                body = new URLSearchParams(formEntries).toString();
            }
        }
        this.request(uri, {
            method: WebRequestMethods.Http.Post,
            headers: headers,
            body,
        }, isSilent, isJson, callback);
    }

    private async request(
        url: string,
        options: RequestInit,
        isSilent: boolean,
        isJson: boolean,
        callback?: (response: HttpResponse) => void
    ) {
        let responseText = '';
        let statusCode = 400;
        let isNetworkError = true;

        try {
            const response = await WebRequestProviderFetch.timeoutFetch(url, options, WebRequestProviderFetch.REQUEST_TIMEOUT);
            statusCode = response.status;
            isNetworkError = !response.ok;
            responseText = await response.text();
        } catch (ex) {
            if (!isSilent) {
                console.error('[WebRequestProvider] Network error:', ex);
            }
            isNetworkError = true;
        }

        const httpResponse = new HttpResponse(responseText, statusCode, isNetworkError, isSilent, isJson);

        try {
            console.log(responseText);
            const json = JSON.parse(responseText);

            if ('service' in json) {
                httpResponse.Service = json.service;
                if (Array.isArray(json.data)) {
                    httpResponse.Body = { list: json.data };
                } else {
                    httpResponse.Body = json.data;
                }
            } else {
                httpResponse.Body = json;
            }

            if (isNetworkError || statusCode >= 400) {
                const errorMessage =
                    (json.error && json.error.message) ||
                    json.detail ||
                    `HTTP ${statusCode}`;

                console.error(`[WebRequestProviderFetch] Server error: ${errorMessage}`);
                httpResponse.Error = Object.assign(new ErrorData(), {
                    message: errorMessage,
                    code: statusCode,
                });
            }
        } catch (err) {
            console.error('[WebRequestProvider] Failed to parse JSON response:', err);
        }

        if (callback) {
            callback(httpResponse);
        }
    }
}
