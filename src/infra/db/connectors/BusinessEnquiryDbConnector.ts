import { Injectable } from '@nestjs/common';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';
import { BusinessEnquiryModel } from '../models/BusinessEnquiryModel';

@Injectable()
export class BusinessEnquiryDbConnector {
  constructor() {}

  async create(enquiry: BusinessEnquiryModel) {
    try {
      return await BusinessEnquiryModel.create(enquiry);
    } catch (error) {
      throw new DatabaseError('Failed to save business enquiry').InnerError(
        error,
      );
    }
  }
}
