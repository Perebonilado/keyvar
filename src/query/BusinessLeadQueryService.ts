import { Injectable } from '@nestjs/common';
import QueryError from 'src/error-handlers/query/QueryError';
import { BusinessLeadModel } from 'src/infra/db/models/BusinessLeadModel';

@Injectable()
export class BusinessLeadQueryService {
  constructor() {}

  async findByEmail(email: string) {
    try {
      return await BusinessLeadModel.findOne({
        where: { email: email.toLowerCase() },
      });
    } catch (error) {
      throw new QueryError('Falied to find business lead by email').InnerError(
        error,
      );
    }
  }
}
