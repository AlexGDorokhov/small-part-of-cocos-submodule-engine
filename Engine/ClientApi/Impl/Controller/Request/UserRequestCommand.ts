import {ICommand, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {ClientApiService} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Model/ClientApiService";
import {PlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Impl/Model/PlayerProxy";

export class UserRequestCommand extends SimpleCommand implements ICommand {

    public execute(): void {
        const playerProxy = this.facade.getProxy(PlayerProxy)!;
        const clientApiService = this.facade.getProxy(ClientApiService)!;

        clientApiService.UserGet(playerProxy.AuthKey);
    }

}
