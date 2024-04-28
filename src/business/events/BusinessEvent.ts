import { BusinessEventType } from './BusinessEventType';

export abstract class BusinessEvent {
  type: BusinessEventType;

  constructor(type: BusinessEventType) {
    this.type = type;
  }
}
