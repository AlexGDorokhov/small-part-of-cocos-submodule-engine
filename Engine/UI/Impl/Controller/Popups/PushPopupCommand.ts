import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {PopupProxy} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Model/PopupProxy";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";

export class PushPopupCommand extends SimpleCommand implements ICommand  {

    execute(notification: INotification) {

        if (notification.body instanceof PopupConfigBase) {
            const config = notification.body;

            if (config) {

                var popupProxy = this.facade.getProxy(PopupProxy)!;

                if (popupProxy.popupExists(config))
                {

                    if (!popupProxy.isPopupFirst(config))
                    {

                        popupProxy.removePopup(config);

                        if (popupProxy.isPopupListEmpty(config.modality))
                        {
                            this.facade.sendNotice(UINoticeKey.ShowPopup, config);
                        }
                        else
                        {
                            popupProxy.addPopup(config);
                        }

                    }

                } else {
                    Log.warn(`PushPopupCommand::execute - ${config} is not available`);
                }
            } else {
                Log.warn(`PushPopupCommand::execute - Config is null`);
            }
        } else {
            Log.error('PushPopupCommand::execute - Invalid notification body: not a PopupConfigBase');
            return;
        }

    }

}
