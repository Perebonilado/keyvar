import { BusinessLead } from 'src/business/models/BusinessLead';
import CommandResponse from './CommandResponse';

export default class CreateBusinessLeadResponse extends CommandResponse {
  readonly businesssLead: BusinessLead;

  constructor(businessLead: BusinessLead) {
    super(businessLead.events);
    this.businesssLead = businessLead;
  }
}
