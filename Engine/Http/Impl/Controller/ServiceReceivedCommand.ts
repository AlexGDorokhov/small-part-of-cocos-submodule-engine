import {RawDataKey} from "db://assets/Scripts/Project/Http/API/Consts/RawDataKey";
import {ICommand, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";

export class ServiceReceivedCommand extends SimpleCommand implements ICommand{
    public execute(): void {

        /*
        const commonSettingsProxy = this.facade.retrieveProxy(CommonSettingsProxy) as CommonSettingsProxy;

        if (RawDataKey.serverTime in data) {
            const serverTime = Number(data[RawDataKey.serverTime]);
            if (!isNaN(serverTime)) {
                commonSettingsProxy.serverTime = serverTime;
            }
        }

        if (RawDataKey.serverTimeOffset in data) {
            const serverTimeOffset = Number(data[RawDataKey.serverTimeOffset]);
            if (!isNaN(serverTimeOffset)) {
                commonSettingsProxy.serverTimeOffset = serverTimeOffset;
            }
        }
        
        */
    }
}
