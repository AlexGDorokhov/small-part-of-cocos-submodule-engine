import { Node } from 'cc';
import {UIWindowConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import {IExtension} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
export class UIWindowNotice<T extends IExtension> {
    public readonly config: UIWindowConfigBase<T>;
    public readonly container?: Node;
    public readonly navigationPosition?: number;
    public readonly navigationGroup?: string;
    public readonly hideIfShown?: boolean;

    constructor(
        config: UIWindowConfigBase<T>,
        options?: {
            container?: Node;
            navigationPosition?: number;
            navigationGroup?: string;
            hideIfShown?: boolean;
        }
    ) {
        this.config = config;
        this.container = options?.container;
        this.navigationPosition = options?.navigationPosition;
        this.navigationGroup = options?.navigationGroup;
        this.hideIfShown = options?.hideIfShown;
    }
}
