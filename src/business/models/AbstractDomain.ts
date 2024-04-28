import { BusinessEvent } from "../events/BusinessEvent";

export class AbstractDomain {
    protected _events: BusinessEvent[];

    constructor() {
        this._events = [];
    }

    get events(): BusinessEvent[] {
        return this._events;
    }
}