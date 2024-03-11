import { Inject } from '@nestjs/common';
import { BusinessLeadDbConnector } from '../connectors/BusinessLeadDbConnector';
import { BusinessLeadRepository } from 'src/business/repository/BusinessLeadRepository';
import { BusinessLead } from 'src/business/models/BusinessLead';
import { BusinessLeadModel } from '../models/BusinessLeadModel';
import RepositoryError from 'src/error-handlers/infra/RepositoryError';

export class BusinessLeadSequalizeRepository implements BusinessLeadRepository {
  constructor(
    @Inject(BusinessLeadDbConnector)
    private dbConnector: BusinessLeadDbConnector,
  ) {}

  async create(businessLead: BusinessLead): Promise<BusinessLeadModel> {
    try {
      return await this.dbConnector.create({
        firstName: businessLead.firstName,
        lastName: businessLead.lastName,
        email: businessLead.email,
        phone: businessLead.phone ?? null,
      } as BusinessLeadModel);
    } catch (error) {
      throw new RepositoryError('Unable to create business lead').InnerError(
        error,
      );
    }
  }
}
