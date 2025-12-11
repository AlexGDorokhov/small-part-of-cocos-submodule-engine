import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";

export default class RemoveWindowStateCommand extends SimpleCommand implements ICommand  {
    public constructor() {
        super();
    }

    public execute(notification: INotification) {
        Log.info(notification.name);
        Log.info('RemoveWindowStateCommand');
    }
}