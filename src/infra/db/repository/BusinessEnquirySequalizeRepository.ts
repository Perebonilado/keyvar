import { Inject } from '@nestjs/common';
import { BusinessEnquiry } from 'src/business/models/BusinessEnquiry';
import { BusinessEnquiryRepository } from 'src/business/repository/BusinessEnquiryRepository';
import { BusinessEnquiryModel } from '../models/BusinessEnquiryModel';
import RepositoryError from 'src/error-handlers/infra/RepositoryError';
import { BusinessEnquiryDbConnector } from '../connectors/BusinessEnquiryDbConnector';

export class BusinessEnquirySequalizeRepository
  implements BusinessEnquiryRepository
{
  constructor(
    @Inject(BusinessEnquiryDbConnector)
    private dbConnector: BusinessEnquiryDbConnector,
  ) {}

  async create(
    businessEnquiry: BusinessEnquiry,
  ): Promise<BusinessEnquiryModel> {
    try {
      return await this.dbConnector.create({
        enquiry: businessEnquiry.enquiry,
        businessLeadId: businessEnquiry.businessLeadId,
      } as BusinessEnquiryModel);
    } catch (error) {
      throw new RepositoryError('Failed to save business enquiry').InnerError(
        error,
      );
    }
  }
}
