import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";

export class UIWindowShownCommand extends SimpleCommand implements ICommand  {
    
    execute(notification: INotification) {

        if (notification.body instanceof UIWindowNotice) {
            const notice = notification.body;        
            const config = notice.config;

            /*
            var sceneProxy = GetProxy<SceneProxy>();
            var nextScene = sceneProxy.NextScene;

            if (nextScene != null && nextScene.Components.Contains(config))
            {

                sceneProxy.RemoveComponent(config);

                if (sceneProxy.IsNextSceneSet && sceneProxy.IsComponentListEmpty)
                {
                    SendNotice(UINoticeKey.SceneShown, nextScene);
                }

            }
            */
            
        } else {
            Log.error('HideUIWindowCommand::execute - Invalid notification body: not a UIWindowNotice');
            return;
        }
            
    }

}
