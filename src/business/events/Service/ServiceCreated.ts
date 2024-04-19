import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';
import { Service } from '../../models/Service';

export class ServiceCreated extends BusinessEvent {
  readonly service: Service;

  constructor(service: Service) {
    super(BusinessEventType.SERVICE_CREATED);

    this.service = service;
  }
}
