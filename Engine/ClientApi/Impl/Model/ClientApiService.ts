import {ClientApiConfig} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Configs/ClientApiConfig";
import {ApiServiceBase} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/ApiServiceBase";
import {ClientApiNotice} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Notices/ClientApiNotice";

export class ClientApiService extends ApiServiceBase<ClientApiConfig> {

    CustomRequest(notice: ClientApiNotice): void {
        const { apiData, fields = {}, isSilent } = notice;

        const keys = Object.keys(fields);
        const values = keys.map(key => fields[key]);

        const apiCustom = new ClientApiConfig(
            ClientApiConfig.ApiCustom.Name,
            apiData,
            keys,
            apiData.RequestMethod,
            isSilent
        );

        this.Request(apiCustom, ...values);
    }

    LoadSettings(): void {
        this.Request(ClientApiConfig.ApplicationConfig);
    }

    UserGet(authKey: string): void {
        this.Request(ClientApiConfig.User, authKey);
    }

    Auth(...values: string[]): void {
        this.Request(ClientApiConfig.UserAuth, ...values);
    }

    protected createFormFields(
        requestParams: string[],
        values: string[]
    ): Array<[string, string]> {

        const formFields = super.CreateFormFields(requestParams, values) as Array<[string, string]>;

        // formFields[RequestParameter.Decode] = "true";

        return formFields;
    }
}
