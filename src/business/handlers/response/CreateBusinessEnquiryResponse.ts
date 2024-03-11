import { BusinessEnquiry } from 'src/business/models/BusinessEnquiry';
import CommandResponse from './CommandResponse';

export default class CreateBusinessEnquiryResponse extends CommandResponse {
  readonly businesssEnquiry: BusinessEnquiry;

  constructor(businessEnquiry: BusinessEnquiry) {
    super(businessEnquiry.events);
    this.businesssEnquiry = businessEnquiry;
  }
}
