import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {IExtension} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
import {PopupProxy} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Model/PopupProxy";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";

export class HidePopupCommand extends SimpleCommand implements ICommand  {

    execute(notification: INotification) {

        if (notification.body instanceof UIWindowNotice) {
            const notice = notification.body;
            const config = notice.config;
            
            if (config instanceof PopupConfigBase) {
                var popupConfig = config as PopupConfigBase<IExtension>;
                if (popupConfig)
                {

                    var modality = popupConfig.modality;
                    var popupProxy = this.facade.getProxy(PopupProxy)!;

                    if (!this.facade.hasExtension(popupConfig.extensionType, popupConfig.mediatorType))
                    {
                        this.facade.sendNotice(UINoticeKey.PopupHidden, popupConfig);
                    }

                }
            }

        } else {
            Log.error('HidePopupCommand::execute - Invalid notification body: not a UIWindowNotice');
            return;
        }

    }

}
