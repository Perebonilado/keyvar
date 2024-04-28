
import { Injectable } from "@nestjs/common";
import { EventEmitter } from 'events'
import { BusinessEvent } from "./BusinessEvent";

Injectable()
export default class KeyvarEventEmitter {
    private nodeEventEmitter: EventEmitter

    constructor() {
        this.nodeEventEmitter = new EventEmitter();
    }

    emit(eventType: string, event: BusinessEvent): void {
        this.nodeEventEmitter.emit(eventType, event);
    }
}