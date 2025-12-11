import {ICommand, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {NetworkName} from "db://assets/sm-ccengine-app/Engine/App/API/Consts/NetworkName";
import {DeviceInfoProxy} from "db://assets/sm-ccengine-app/Engine/App/Impl/Model/DeviceInfoProxy";
import {VersionSettingsProxy} from "db://assets/sm-ccengine-app/Engine/Settings/Impl/Model/VersionSettingsProxy";
import {CommonSettingsProxy} from "db://assets/sm-ccengine-app/Engine/Settings/Impl/Model/CommonSettingsProxy";
import {PlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Impl/Model/PlayerProxy";
import {IPlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Api/Model/IPlayerProxy";
import {ClientApiService} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Model/ClientApiService";
import {ProjectPlayerProxy} from "db://assets/Scripts/Project/Users/Impl/Model/ProjectPlayerProxy";
import {
    ExternalInterfaceService
} from "db://assets/sm-ccengine-app/Engine/ExternalCall/Impl/Model/ExternalInterfaceService";
import {ProjectConfig} from "db://assets/sm-ccengine-app/Engine/Project/ProjectConfig";

export class UserAuthRequestCommand extends SimpleCommand implements ICommand {

    execute(): void {

        const deviceInfoProxy = this.facade.getProxy(DeviceInfoProxy)!;
        const playerProxy = this.facade.getProxy(ProjectPlayerProxy)!;
        
        const commonSettingsProxy = this.facade.getProxy(CommonSettingsProxy)!;
        const versionSettingsProxy = this.facade.getProxy(VersionSettingsProxy)!;
        const clientApiService = this.facade.getProxy(ClientApiService)!;
        const externalInterfaceService = this.facade.getProxy(ExternalInterfaceService)!;

        // Set user external ID and network
        playerProxy.Network = externalInterfaceService.GetNetwork();
        commonSettingsProxy.Network = playerProxy.Network;
        commonSettingsProxy.Vendor = externalInterfaceService.GetVendor();
        playerProxy.ExternalId = `${deviceInfoProxy.UniqueDeviceId}|${playerProxy.Network}`;

        // Prepare fields for auth call
        const fields: string[] = [
            playerProxy.ExternalId,
            ProjectConfig.version,//versionSettingsProxy.Current.toString(),
            playerProxy.Network,//commonSettingsProxy.Network,
            commonSettingsProxy.Vendor,//commonSettingsProxy.Vendor,
            //commonSettingsProxy.Language,
            //versionSettingsProxy.Protocol,
            //deviceInfoProxy.UniqueDeviceId,
        ];
        
        // Update network in common settings
        //commonSettingsProxy.Network = NetworkName.Guest;

        // Call auth method
        clientApiService.Auth(...fields);
    }
}
