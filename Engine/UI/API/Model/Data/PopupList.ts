export class PopupList<TPopup> {
    private list: TPopup[] = [];
    private enabled: boolean = true;

    get count(): number {
        return this.list.length;
    }

    insert(popup: TPopup): void {
        if (!this.list.includes(popup)) {
            this.list.unshift(popup);
        }
    }

    add(popup: TPopup): void {
        if (!this.list.includes(popup)) {
            this.list.push(popup);
        }
    }

    addExtra(popup: TPopup): void {
        this.list.push(popup);
    }

    remove(popup: TPopup): void {
        const index = this.list.indexOf(popup);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    contains(popup: TPopup): boolean {
        return this.list.includes(popup);
    }

    isFirst(popup: TPopup): boolean {
        return this.list.length > 0 && this.list[0] === popup;
    }

    getFirstOrDefault(): TPopup | undefined {
        return this.list.length > 0 ? this.list[0] : undefined;
    }

    removeFirst(): void {
        if (this.list.length > 0) {
            this.list.shift();
        }
    }

    isEmpty(): boolean {
        return this.list.length === 0;
    }

    clear(): void {
        this.list = [];
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    setEnabled(value: boolean): void {
        this.enabled = value;
    }
}
