import { IMediator } from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import { Extension } from "db://assets/sm-ccengine-app/Engine/Extension";
import { UIWindowConfigBase } from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import { Node } from 'cc';
import {UIWindowExtension} from "db://assets/sm-ccengine-app/Engine/UI/Impl/UIWindowExtension";

export class UIPopupExtension<TMediator extends IMediator> extends UIWindowExtension<TMediator> {

    constructor(
        config: UIWindowConfigBase<any>,
        popup: Node
    ) {
        super(config, popup);
    }

}
