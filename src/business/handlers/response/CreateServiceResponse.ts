import { Service } from 'src/business/models/Service';
import CommandResponse from './CommandResponse';

export default class CreateServiceResponse extends CommandResponse {
  readonly service: Service;

  constructor(service: Service) {
    super(service.events);
    this.service = service;
  }
}
