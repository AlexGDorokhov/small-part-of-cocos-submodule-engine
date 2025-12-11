import {ApiCustomName} from "db://assets/Scripts/Project/Http/API/Consts/ApiCustomName";
import {ApiServerType} from "db://assets/Scripts/Project/Http/API/Consts/ApiServerType";

export class ApiData {

    public readonly ServerType: ApiServerType;
    public Endpoint: string;
    public readonly RequestMethod: string;
    public readonly CustomName: ApiCustomName;

    constructor(
        serverType: ApiServerType,
        endpoint: string,
        requestMethod: string,
        customName: ApiCustomName = ApiCustomName.Undefined
    ) {
        this.ServerType = serverType;
        this.Endpoint = endpoint;
        this.RequestMethod = requestMethod;
        this.CustomName = customName;
    }
}
