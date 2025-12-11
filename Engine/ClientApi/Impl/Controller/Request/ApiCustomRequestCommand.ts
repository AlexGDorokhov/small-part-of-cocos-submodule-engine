import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {RequestParameter} from "db://assets/Scripts/Project/Http/API/Consts/RequestParameter";
import {ClientApiService} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Model/ClientApiService";
import {ClientApiNotice} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Notices/ClientApiNotice";
import {IPlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Api/Model/IPlayerProxy";
import {PlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Impl/Model/PlayerProxy";

export class ApiCustomRequestCommand extends SimpleCommand implements ICommand {
    public execute(notice: INotification): void {

        if (notice.body instanceof ClientApiNotice) {

            if (!notice.body.fields) {
                notice.body.fields = {};
            }

            if (!(RequestParameter.AuthKey in notice.body.fields)) {
                const playerProxy = this.facade.getProxy(PlayerProxy)!;
                notice.body.fields[RequestParameter.AuthKey] = playerProxy.AuthKey;
            }

            const apiService = this.facade.getProxy(ClientApiService)!;
            apiService.CustomRequest(notice.body);
        }
    }
}
