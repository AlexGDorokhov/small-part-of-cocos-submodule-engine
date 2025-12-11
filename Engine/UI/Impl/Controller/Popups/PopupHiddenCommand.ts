import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {PopupProxy} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Model/PopupProxy";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";

export class PopupHiddenCommand extends SimpleCommand implements ICommand  {

    execute(notification: INotification) {

        if (notification.body instanceof PopupConfigBase) {
            const config = notification.body;

            if (config) {

                this.facade.removeExtension(config.extensionType, config.mediatorType);
                
                var popupProxy = this.facade.getProxy(PopupProxy)!;
                
                if (popupProxy.popupExists(config))
                {
                    popupProxy.removePopup(config);
                    this.facade.sendNotice(UINoticeKey.ShowFirstPopup, config.modality);
                }

            } else {
                Log.warn(`PopupHiddenCommand::execute - Config is null`);
            }
        } else {
            Log.error('PopupHiddenCommand::execute - Invalid notification body: not a PopupConfigBase');
            return;
        }

    }

}
