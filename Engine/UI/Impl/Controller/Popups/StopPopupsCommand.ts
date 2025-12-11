import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {PopupProxy} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Model/PopupProxy";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";

export class StopPopupsCommand extends SimpleCommand implements ICommand  {

    execute(notification: INotification) {

        if (typeof notification.body === 'boolean') {
            const modality = notification.body;

            var popupProxy = this.facade.getProxy(PopupProxy)!;
            
            if (popupProxy.isPopupListEnabled(modality))
            {

                popupProxy.setPopupListEnabled(modality, false);

                if (!popupProxy.isPopupListEmpty(modality))
                {

                    this.facade.sendNotice(UINoticeKey.HideUIWindow,
                        new UIWindowNotice(popupProxy.getFirstPopupOrDefault(modality)!));

                    popupProxy.removeFirstPopup(modality);

                }

            }

        } else {
            Log.error('StopPopupsCommand::execute - Invalid notification body: not a boolean');
            return;
        }

    }

}
