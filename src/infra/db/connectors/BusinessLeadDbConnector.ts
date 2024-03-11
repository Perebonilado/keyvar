import { Injectable } from '@nestjs/common';
import { BusinessLeadModel } from '../models/BusinessLeadModel';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';

@Injectable()
export class BusinessLeadDbConnector {
  async create(businessLead: BusinessLeadModel) {
    try {
      return await BusinessLeadModel.create(businessLead);
    } catch (error) {
      throw new DatabaseError('Failed to create business lead').InnerError(
        error,
      );
    }
  }
}
