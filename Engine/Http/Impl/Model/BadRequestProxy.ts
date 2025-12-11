import { Proxy } from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {PendingRequest} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/PendingRequest";

export class BadRequestProxy extends Proxy<PendingRequest[]> {

    constructor() {
        super([]);
    }

    public onRegister(): void {
        super.onRegister?.();
        this.data = [];
    }

    public Push(request: PendingRequest): void {
        if (!this.data.includes(request)) {
            this.data.push(request);
        }
    }

    public Pop(): PendingRequest | undefined {
        if (this.data.length > 0) {
            return this.data.shift();
        }
        return undefined;
    }

    public Peek(): PendingRequest | undefined {
        return this.data.length > 0 ? this.data[0] : undefined;
    }

    public Contains(request: PendingRequest): boolean {
        return this.data.includes(request);
    }

    public Remove(request: PendingRequest): void {
        const index = this.data.indexOf(request);
        if (index !== -1) {
            this.data.splice(index, 1);
        }
    }

    public IsEmpty(): boolean {
        return this.data.length === 0;
    }

    public Clear(): void {
        this.data.length = 0;
    }
}
