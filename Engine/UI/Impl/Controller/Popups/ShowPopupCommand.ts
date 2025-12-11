import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {PopupProxy} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Model/PopupProxy";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";

export class ShowPopupCommand extends SimpleCommand implements ICommand  {

    execute(notification: INotification) {

        if (notification.body instanceof PopupConfigBase) {
            const config = notification.body;

            if (config) {

                var popupProxy = this.facade.getProxy(PopupProxy)!;

                if (popupProxy.popupExists(config)) {

                    var modality = config.modality;

                    if (!popupProxy.isPopupListEmpty(modality)) {

                        if (!popupProxy.containsPopup(config)) {
                            var firstConfig = popupProxy.getFirstPopupOrDefault(modality);
                            popupProxy.insertPopup(config);
                            this.facade.sendNotice(UINoticeKey.HideUIWindow, new UIWindowNotice(firstConfig!));
                        }

                        if (!popupProxy.isPopupFirst(config)) {
                            popupProxy.removePopup(config);
                            var firstConfig = popupProxy.getFirstPopupOrDefault(modality);
                            popupProxy.insertPopup(config);
                            this.facade.sendNotice(UINoticeKey.HideUIWindow, new UIWindowNotice(firstConfig!));
                        }

                        if (popupProxy.containsPopup(config) && config.canBeSeveralPopup) {
                            popupProxy.addExtraPopup(config);
                        }
                    } else {
                        popupProxy.insertPopup(config);
                        this.facade.sendNotice(UINoticeKey.ShowFirstPopup, modality);
                    }

                } else {
                    Log.warn(`ShowPopupCommand::execute - ${config} is not available`);
                }
            } else {
                Log.warn(`ShowPopupCommand::execute - Config is null`);
            }
        } else {
            Log.error('ShowPopupCommand::execute - Invalid notification body: not a PopupConfigBase');
            return;
        }

    }

}
