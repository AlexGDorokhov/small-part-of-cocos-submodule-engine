import {RawDataKey} from "db://assets/Scripts/Project/Http/API/Consts/RawDataKey";
import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {
    IExternalInterfaceService
} from "db://assets/sm-ccengine-app/Engine/ExternalCall/API/Models/IExternalInterfaceService";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {CommonSettingsProxy} from "db://assets/sm-ccengine-app/Engine/Settings/Impl/Model/CommonSettingsProxy";
import {RawUserDataNotice} from "db://assets/sm-ccengine-app/Engine/Users/Api/Notices/RawUserDataNotice";
import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import {ClientApiNoticeKey} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Notices/Keys/ClientApiNoticeKey";
import {PlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Impl/Model/PlayerProxy";
import {IPlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Api/Model/IPlayerProxy";
import {
    ExternalInterfaceService
} from "db://assets/sm-ccengine-app/Engine/ExternalCall/Impl/Model/ExternalInterfaceService";
import {ClientApiConfig} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Configs/ClientApiConfig";

export class UserAuthResponseCommand extends SimpleCommand implements ICommand {

    public execute(notice: INotification): void {

        if (notice.body instanceof HttpResponse) {

            const response = notice.body as HttpResponse;
            
            const error = response.Error;

            if (!error?.code) {
                let body = response.Body;
                
                if (body) {
                    if (body.hasOwnProperty(RawDataKey.entity)) {
                        body = body[RawDataKey.entity] as Record<string, unknown>;
                    }

                    if (body.hasOwnProperty(RawDataKey.userAuth)) {
                        body = body[RawDataKey.userAuth] as Record<string, unknown>;
                    }

                    const playerProxy = this.facade.getProxy(PlayerProxy)!;
                    let idExternal: string = '';

                    if (body[RawDataKey.idExternal]) {
                        idExternal = String(body[RawDataKey.idExternal]);
                    } else if (body[RawDataKey.externalId]) {
                        idExternal = String(body[RawDataKey.externalId]);
                    }
                    
                    if (idExternal) {
                        playerProxy.ExternalId = idExternal;

                        const externalInterfaceService = this.facade.getProxy(ExternalInterfaceService);
                        if (externalInterfaceService) {
                            //externalInterfaceService.SetExternalId(playerProxy.ExternalId);
                        }
                    }

                    if (body[RawDataKey.id]) {
                        playerProxy.Id = String(body[RawDataKey.id]);
                    }

                    if (body[RawDataKey.createdAt]) {
                        try {
                            playerProxy.CreatedAt = Number(body[RawDataKey.createdAt]);
                        } catch (e) {
                            Log.null(e);
                        }
                    }

                    if (body.hasOwnProperty(RawDataKey.isActive)) {
                        playerProxy.IsActive = Boolean(body[RawDataKey.isActive]);
                    }
                    
                    if (body[RawDataKey.authKey]) {
                        playerProxy.AuthKey = String(body[RawDataKey.authKey]);
                    }

                    if (body.hasOwnProperty(RawDataKey.connected)) {
                        playerProxy.SocialNetworkConnected = Boolean(body[RawDataKey.connected]);
                    } else {
                        playerProxy.SocialNetworkConnected = true; // TODO: default assumption
                    }

                    if (body[RawDataKey.network]) {
                        const network = String(body[RawDataKey.network]);

                        //this.facade.getProxy(CommonSettingsProxy)!.Network = network;
                        playerProxy.Network = network;
                    }

                } else {
                    Log.error(`[UserAuthResponseCommand] Response is null`);
                }
            } else {
                Log.warn(`[UserAuthResponseCommand] ErrorCode: ${error.code} - ${error.message}`);
            }

            if (response.Body.hasOwnProperty(RawDataKey.user)) {
                this.facade.sendNotice(ClientApiConfig.User.ResponseNoticeKey, notice.body);
                //this.facade.sendNotice(ClientApiConfig.User.RequestNoticeKey);
            }
            
            this.facade.sendNotice(ClientApiNoticeKey.PlayerAuthorized);
            
        } else {
            Log.error(`[UserAuthResponseCommand] Response error - notice type is not HttpResponse. notice is:`);
            console.error(notice);
        }
        
        
    }
}
