import {ClientApiConfig} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Configs/ClientApiConfig";
import {
    UserAuthRequestCommand
} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Controller/Request/UserAuthRequestCommand";
import {ClientApiService} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Model/ClientApiService";
import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import {Extension} from "db://assets/sm-ccengine-app/Engine/Extension";
import {
    UserAuthResponseCommand
} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Controller/Response/UserAuthResponseCommand";
import {ClientApiNoticeKey} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Notices/Keys/ClientApiNoticeKey";
import {ClientApiNotice} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Notices/ClientApiNotice";
import {
    ApiCustomResponseCommand
} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Controller/Response/ApiCustomResponseCommand";
import {
    ApiCustomRequestCommand
} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Controller/Request/ApiCustomRequestCommand";
import {
    UserResponseCommand
} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Controller/Response/UserResponseCommand";
import {
    UserRequestCommand
} from "db://assets/sm-ccengine-app/Engine/ClientApi/Impl/Controller/Request/UserRequestCommand";

export class ClientApiExtension extends Extension {
    protected override extend(): void {
        super.extend();
        this.addProxies();
        this.bindCommands();
    }

    protected override cleanUp(): void {
        this.removeProxies();
        this.unbindCommands();
        super.cleanUp();
    }

    protected addProxies(): void {
        this.addProxyInstance(new ClientApiService());
    }

    protected bindCommands(): void {
        
        this.bindCommand(ClientApiNoticeKey.CustomRequest, ApiCustomRequestCommand);
        this.bindCommand(ClientApiConfig.ApiCustom.ResponseNoticeKey, ApiCustomResponseCommand);

        this.bindCommand(ClientApiConfig.UserAuth.RequestNoticeKey, UserAuthRequestCommand);
        this.bindCommand(ClientApiConfig.UserAuth.ResponseNoticeKey, UserAuthResponseCommand);

        this.bindCommand(ClientApiConfig.User.RequestNoticeKey, UserRequestCommand);
        this.bindCommand(ClientApiConfig.User.ResponseNoticeKey, UserResponseCommand);

        //this.bindCommand(ClientApiNoticeKey.PlayerAuthorized, UserAuthorizedCommand);

    }

    protected removeProxies(): void {
        this.removeProxy(ClientApiService);
    }

    protected unbindCommands(): void {
        this.unbindCommand(ClientApiNoticeKey.CustomRequest, ApiCustomRequestCommand);
        this.unbindCommand(ClientApiConfig.ApiCustom.ResponseNoticeKey, ApiCustomResponseCommand);

        this.unbindCommand(ClientApiConfig.UserAuth.RequestNoticeKey, UserAuthRequestCommand);
        this.unbindCommand(ClientApiConfig.UserAuth.ResponseNoticeKey, UserAuthResponseCommand);

        this.unbindCommand(ClientApiConfig.User.RequestNoticeKey, UserRequestCommand);
        this.unbindCommand(ClientApiConfig.User.ResponseNoticeKey, UserResponseCommand);

        //this.unbindCommand(ClientApiNoticeKey.PlayerAuthorized, UserAuthorizedCommand);
    }
}
