import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";

export interface IHttpProvider {
    CallHead(
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form?: Array<[string, string]> | undefined,
        callback?: ((response: HttpResponse) => void) | undefined
    ): void;

    CallGet(
        uri: string,
        isSilent: boolean,
        isJson: boolean,
        form?: Array<[string, string]> | undefined,
        callback?: ((response: HttpResponse) => void) | undefined
    ): void;

    CallPost(
        uri: string,
        isSilent: boolean,
        isJson:boolean,
        form?: Array<[string, string]> | undefined,
        callback?: ((response: HttpResponse) => void) | undefined
    ): void;
}
