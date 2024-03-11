import { BusinessEnquiry } from 'src/business/models/BusinessEnquiry';
import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';

export class BusinessEnquiryCreated extends BusinessEvent {
  readonly businessEnquiry: BusinessEnquiry;

  constructor(businessEnquiry: BusinessEnquiry) {
    super(BusinessEventType.BUSINESS_ENQUIRY_CREATED);
    this.businessEnquiry = businessEnquiry;
  }
}
