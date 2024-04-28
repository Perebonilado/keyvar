import { BusinessLeadModel } from 'src/infra/db/models/BusinessLeadModel';
import { BusinessLead } from '../models/BusinessLead';

export const BusinessLeadRepository = Symbol('BusinessLeadRepository');

export interface BusinessLeadRepository {
  create(businessLead: BusinessLead): Promise<BusinessLeadModel>;
}
