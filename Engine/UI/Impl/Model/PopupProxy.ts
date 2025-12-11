import {Proxy} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {IExtension} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
import {PopupList} from "db://assets/sm-ccengine-app/Engine/UI/API/Model/Data/PopupList";
import {PopupConfig} from "db://assets/Scripts/Project/UI/Impl/Configs/PopupConfig";

export class PopupProxy extends Proxy<PopupConfigBase<IExtension>[]> {
    
    private modalPopupList: PopupList<PopupConfigBase<IExtension>>;
    private nonmodalPopupList: PopupList<PopupConfigBase<IExtension>>;

    constructor() {
        const popupList = PopupConfig.getList().map(p => p as PopupConfigBase<IExtension>);
        super(popupList);
        this.modalPopupList = new PopupList<PopupConfigBase<IExtension>>();
        this.nonmodalPopupList = new PopupList<PopupConfigBase<IExtension>>();
    }

    public override onRegister(): void {
        super.onRegister();
    }

    public override onRemove(): void {
        this.modalPopupList = null!;
        this.nonmodalPopupList = null!;
        super.onRemove();
    }

    isPopupListEnabled(modality: boolean): boolean {
        return this.getPopupList(modality).isEnabled();
    }

    setPopupListEnabled(modality: boolean, value: boolean): void {
        this.getPopupList(modality).setEnabled(value);
    }

    popupExists(config: PopupConfigBase<IExtension> | null): boolean {
        return config !== null && this.data.includes(config);
    }

    insertPopup(config: PopupConfigBase<IExtension>): void {
        this.getPopupList(config.modality).insert(config);
    }

    addPopup(config: PopupConfigBase<IExtension>): void {
        this.getPopupList(config.modality).add(config);
    }

    addExtraPopup(config: PopupConfigBase<IExtension>): void {
        this.getPopupList(config.modality).addExtra(config);
    }

    removePopup(config: PopupConfigBase<IExtension>): void {
        this.getPopupList(config.modality).remove(config);
    }

    containsPopup(config: PopupConfigBase<IExtension>): boolean {
        return this.getPopupList(config.modality).contains(config);
    }

    isPopupFirst(config: PopupConfigBase<IExtension>): boolean {
        return this.getPopupList(config.modality).isFirst(config);
    }

    getFirstPopupOrDefault(modality: boolean): PopupConfigBase<IExtension> | undefined {
        return this.getPopupList(modality).getFirstOrDefault();
    }

    removeFirstPopup(modality: boolean): void {
        this.getPopupList(modality).removeFirst();
    }

    isPopupListEmpty(modality: boolean): boolean {
        return this.getPopupList(modality).isEmpty();
    }

    popupListSize(modality: boolean): number {
        return this.getPopupList(modality).count;
    }

    clearPopupList(modality: boolean): void {
        this.getPopupList(modality).clear();
    }

    private getPopupList(modality: boolean): PopupList<PopupConfigBase<IExtension>> {
        return modality ? this.modalPopupList : this.nonmodalPopupList;
    }
}
