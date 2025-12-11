import {ApiServerType} from "db://assets/Scripts/Project/Http/API/Consts/ApiServerType";
import {WebRequestMethods} from "db://assets/sm-ccengine-app/Engine/Http/API/Consts/WebRequestMethods";
import {ApiData} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Model/Data/ApiData";

export const ApiClientEngine = {
    ApiCustom: new ApiData(ApiServerType.HttpClientApi, "", WebRequestMethods.Http.Get),
    ApplicationConfig: new ApiData(ApiServerType.HttpClientApi, "/api/app/config", WebRequestMethods.Http.Get),
    AppVersion: new ApiData(ApiServerType.HttpClientApi, "/api/app/version", WebRequestMethods.Http.Get),
    Ping: new ApiData(ApiServerType.HttpClientApi, "/api/ping", WebRequestMethods.Http.Get),

    UserAuth: new ApiData(ApiServerType.HttpClientApi, "/api/user/auth", WebRequestMethods.Http.Post),
    User: new ApiData(ApiServerType.HttpClientApi, "/api/user", WebRequestMethods.Http.Get),
    UserUpdate: new ApiData(ApiServerType.HttpClientApi, "/api/user/update", WebRequestMethods.Http.Post),
    FriendsList: new ApiData(ApiServerType.HttpClientApi, "/api/user/friend/list", WebRequestMethods.Http.Get),
};