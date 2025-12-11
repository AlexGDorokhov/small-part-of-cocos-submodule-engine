import {Facade, Service} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {ApiConfigBase} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Configs/Base/ApiConfigBase";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import {HttpNoticeKey} from "db://assets/Scripts/Project/Http/API/Notices/Keys/HttpNoticeKey";
import {PopupConfig} from "db://assets/Scripts/Project/UI/Impl/Configs/PopupConfig";
import {PendingRequestProxy} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/PendingRequestProxy";
import {ProjectConfig} from "db://assets/sm-ccengine-app/Engine/Project/ProjectConfig";
import {RequestParameter} from "db://assets/Scripts/Project/Http/API/Consts/RequestParameter";
import {VersionSettingsProxy} from "db://assets/sm-ccengine-app/Engine/Settings/Impl/Model/VersionSettingsProxy";
import {CommonSettingsProxy} from "db://assets/sm-ccengine-app/Engine/Settings/Impl/Model/CommonSettingsProxy";
import {DeviceInfoProxy} from "db://assets/sm-ccengine-app/Engine/App/Impl/Model/DeviceInfoProxy";

export abstract class ApiServiceBase<TApiConfig extends ApiConfigBase> extends Service {

    public Request(config: TApiConfig, ...values: string[]): void {
        if (!config.IsSilent) {
            Log.info(`Execute request [${config.Name}]`);
        }

        const pendingRequestProxy = this.facade.getProxy(PendingRequestProxy)!;

        const onResponse = (response: HttpResponse): void => {
            response.Api = config;
            response.ApiRequestValues = values;

            if (!config.IsSilent) {
                Log.info(`Execute response [${config.Name}]`);
            }

            if (response.Service != null) {
                this.facade.sendNotice(HttpNoticeKey.ServiceReceivedNoticeKey, response);
            }

            if (config.IsSilent) {
                this.facade.sendSilentNotice(config.ResponseNoticeKey, response);
            } else {
                this.facade.sendNotice(config.ResponseNoticeKey, response);
            }
        };

        const serverUrl = ProjectConfig.getServerByType(config.Api.ServerType);

        if (!/^https?:\/\//.test(serverUrl)) {
            Log.error(`A request has not been executed cause the URL of the server is invalid: [${serverUrl}]`);
            onResponse(new HttpResponse("", 502, true, config.IsSilent, config.IsJson));
            return;
        }

        const requestParams = config.RequestParams;

        if (requestParams.length <= values.length) {
            let endpoint = config.Api.Endpoint;

            if (values.length > requestParams.length) {
                endpoint = endpoint.replace(/\{.*?\}/g, values[values.length - 1]);
            }

            const uri = `${serverUrl}${endpoint}`;
            const formFields = this.CreateFormFields(requestParams, values);

            
            //if (typeof window === "undefined" || !this.facade.hasExtension(PopupConfig.UpdateGame.ExtensionType)) {
                pendingRequestProxy.Request(
                    uri,
                    config.IsSilent,
                    config.IsJson,
                    formFields,
                    onResponse,
                    config.RequestMethod,
                    true,
                    config.IsCritical
                );
            //}
        } else {
            console.error(`[ApiServiceBase] Wrong values for ${config.Name} config: requestParams.length > values.length`);
            onResponse(new HttpResponse("", 400, true, config.IsSilent, config.IsJson));
        }
    }

    protected CreateFormFields(requestParams: string[], values: string[]): Array<[string, string]> {
        //const commonSettingsProxy = this.facade.getProxy(CommonSettingsProxy)!;
        //const versionSettingsProxy = this.facade.getProxy(VersionSettingsProxy)!;
        //const deviceInfoProxy = this.facade.getProxy(DeviceInfoProxy)!;

        const formFields: Array<[string, string]> = [
            //[RequestParameter.Version, versionSettingsProxy.Current.toString()],
            //[RequestParameter.Network, commonSettingsProxy.Network],
            //[RequestParameter.Lang, commonSettingsProxy.Language],
            //[RequestParameter.Vendor, commonSettingsProxy.Vendor],
            //[RequestParameter.CurrentProtocolVersion, versionSettingsProxy.Protocol]
        ];

        for (let i = 0; i < requestParams.length; i++) {
            formFields.push([requestParams[i], values[i]]);
        }

        return formFields;
    }

}
