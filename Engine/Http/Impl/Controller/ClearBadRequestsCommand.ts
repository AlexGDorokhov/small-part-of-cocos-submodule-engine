import {ICommand, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import { BadRequestProxy } from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/BadRequestProxy";

export class ClearBadRequestsCommand extends SimpleCommand implements ICommand {
    public execute(): void {
        const proxy = this.facade.retrieveProxy(BadRequestProxy)!;
        proxy.Clear();
    }
}
