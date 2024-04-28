import { BusinessEnquiryModel } from 'src/infra/db/models/BusinessEnquiryModel';
import { BusinessEnquiry } from '../models/BusinessEnquiry';

export const BusinessEnquiryRepository = Symbol('BusinessEnquiryRepository');

export interface BusinessEnquiryRepository {
  create(enquiry: BusinessEnquiry): Promise<BusinessEnquiryModel>;
}
