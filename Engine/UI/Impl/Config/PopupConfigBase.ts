import { Vec3 } from "cc";
import {UIWindowConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import {INamedAssetConfig} from "db://assets/sm-ccengine-app/Engine/Assets/Impl/Configs/INamedAssetConfig";
import {SceneLayerConfig} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/SceneLayerConfig";
import {
    IExtension, ExtensionConstructor, MediatorConstructor
} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
import {IMediator} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";

export abstract class PopupConfigBase<T extends IExtension> extends UIWindowConfigBase<T> {
    
    public readonly modality: boolean;
    public readonly canBeSeveralPopup: boolean;
    public readonly soundShow: string | undefined;
    public readonly soundHide: string | undefined;
    public readonly scaleDefault: Vec3;
    public readonly scaleMobile: Vec3;

    constructor(
        extensionType: ExtensionConstructor<T>,
        mediatorType: MediatorConstructor<IMediator>,
        asset: INamedAssetConfig,
        layer: SceneLayerConfig,
        modality: boolean,
        soundClick: string | undefined = undefined,
        soundShow: string | undefined = undefined,
        soundHide: string | undefined = undefined,
        scaleDefault: Vec3 = new Vec3( 0, 0, 0 ),
        scaleMobile: Vec3 = new Vec3( 0, 0, 0 ),
        canBeSeveralPopup: boolean = false
    ) {
        super(extensionType, mediatorType, asset, soundClick, layer);
        this.modality = modality;
        this.canBeSeveralPopup = canBeSeveralPopup;
        this.soundShow = soundShow;
        this.soundHide = soundHide;
        this.scaleDefault = scaleDefault;
        this.scaleMobile = scaleMobile;
    }
    
}
