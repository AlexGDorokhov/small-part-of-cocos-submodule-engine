import {RequestParameter} from "db://assets/Scripts/Project/Http/API/Consts/RequestParameter";
import {ApiClient} from "db://assets/Scripts/Project/Http/API/Consts/Endpoints/ApiClient";
import {ApiConfigBase} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Configs/Base/ApiConfigBase";
import {ApiData} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Model/Data/ApiData";
import {WebRequestMethods} from "db://assets/sm-ccengine-app/Engine/Http/API/Consts/WebRequestMethods";

export class ClientApiConfig extends ApiConfigBase {

    static readonly ApiCustom = new ClientApiConfig(
        'ApiCustom',
        ApiClient.ApiCustom
    );

    static readonly ApplicationConfig = new ClientApiConfig(
        'ApplicationConfig',
        ApiClient.ApplicationConfig
    );

    static readonly User = new ClientApiConfig(
        'User',
        ApiClient.User,
        [RequestParameter.AuthKey]
    );

    static readonly UserAuth = new ClientApiConfig(
        'UserAuth',
        ApiClient.UserAuth,
        [
            RequestParameter.ExternalId,
            RequestParameter.Version,
            RequestParameter.Network,
            RequestParameter.Vendor,
            //RequestParameter.Lang,
            //RequestParameter.CurrentProtocolVersion,
            //RequestParameter.DeviceId,
        ],
        ApiClient.UserAuth.RequestMethod,
        false,
        true
    );

    constructor(
        name: string,
        api: ApiData,
        requestParams: string[] | undefined = undefined,
        requestMethod: string = 'GET',
        isSilent: boolean = false,
        isJson: boolean = false,
    ) {
        super(name, api, requestParams, requestMethod, isSilent, isJson, true);
    }

}
