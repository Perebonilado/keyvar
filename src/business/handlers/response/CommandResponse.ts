import { BusinessEvent } from 'src/business/events/BusinessEvent';

export default abstract class CommandResponse {
  private _events: BusinessEvent[];

  constructor(events: BusinessEvent[]) {
    this._events = events;
  }

  get events(): BusinessEvent[] {
    return this._events;
  }

  clearEvents(): void {
    this._events = [];
  }
}
