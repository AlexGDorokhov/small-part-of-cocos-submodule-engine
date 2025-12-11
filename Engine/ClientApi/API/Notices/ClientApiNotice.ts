import {ApiData} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Model/Data/ApiData";

export class ClientApiNotice {
    public apiData: ApiData;
    public fields?: Record<string, string>;
    public isSilent: boolean;

    constructor(apiData: ApiData, fields?: Record<string, string>, isSilent = false) {
        this.apiData = apiData;
        this.fields = fields ?? {};
        this.isSilent = isSilent;
    }
}
