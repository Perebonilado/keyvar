import { BusinessLead } from 'src/business/models/BusinessLead';
import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';

export class BusinessLeadCreated extends BusinessEvent {
  readonly businessLead: BusinessLead;

  constructor(businessLead: BusinessLead) {
    super(BusinessEventType.BUSINESS_LEAD_CREATED);
    this.businessLead = businessLead;
  }
}
