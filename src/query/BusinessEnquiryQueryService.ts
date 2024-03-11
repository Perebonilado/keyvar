import { Injectable } from '@nestjs/common';
import QueryError from 'src/error-handlers/query/QueryError';
import { BusinessEnquiryModel } from 'src/infra/db/models/BusinessEnquiryModel';

@Injectable()
export class BusinessEnquiryQueryService {
  constructor() {}

  public async findById(id: string) {
    try {
      return await BusinessEnquiryModel.findOne({ where: { id } });
    } catch (error) {
      throw new QueryError('Failed to find business enquiry by id').InnerError(
        error,
      );
    }
  }
}
