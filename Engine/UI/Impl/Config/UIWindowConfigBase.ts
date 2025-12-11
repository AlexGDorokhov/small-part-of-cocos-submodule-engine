import {
    ExtensionConstructor,
    IExtension, MediatorConstructor
} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
import {SceneLayerConfig} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/SceneLayerConfig";
import {INamedAssetConfig} from "db://assets/sm-ccengine-app/Engine/Assets/Impl/Configs/INamedAssetConfig";
import {UIWindowExtension} from "db://assets/sm-ccengine-app/Engine/UI/Impl/UIWindowExtension";
import {IMediator} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";

export abstract class UIWindowConfigBase<T extends IExtension> {
    public readonly extensionType: ExtensionConstructor<T>;
    public readonly mediatorType: MediatorConstructor<IMediator>;
    public readonly asset: INamedAssetConfig;
    public readonly soundClick?: string;
    public readonly layer?: SceneLayerConfig;

    constructor(
        extensionType: ExtensionConstructor<T>,
        mediatorType: MediatorConstructor<IMediator>,
        asset: INamedAssetConfig,
        soundClick?: string,
        layer?: SceneLayerConfig
    ) {
        if (typeof extensionType !== 'function') {
            throw new Error(`The extension is not a valid constructor`);
        }

        this.extensionType = extensionType;
        this.mediatorType = mediatorType;
        this.asset = asset;
        this.soundClick = soundClick;
        this.layer = layer;
    }

    public toString(): string {
        return this.extensionType?.name ?? '[UIWindowConfigBase]';
    }

}
