import {ErrorData} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/ErrorData";
import {ApiConfigBase} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Configs/Base/ApiConfigBase";

export class HttpResponse {

    public readonly IsSilent: boolean;
    public readonly IsJson: boolean;
    public readonly ResponseText: string;
    public readonly StatusCode: number;
    public readonly IsNetworkError: boolean;

    public Body: Record<string, unknown> = {};
    public Service: Record<string, unknown> = {};
    public Error?: ErrorData;
    public Api?: ApiConfigBase;
    public ApiRequestValues: string[] = [];

    constructor(
        responseText: string,
        statusCode: number,
        isNetworkError: boolean,
        isSilent: boolean,
        isJson: boolean
    ) {
        this.ResponseText = responseText;
        this.StatusCode = statusCode;
        this.IsNetworkError = isNetworkError;
        this.IsSilent = isSilent;
        this.IsJson = isJson;
    }
}
