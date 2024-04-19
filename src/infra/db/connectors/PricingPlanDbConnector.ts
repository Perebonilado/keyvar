import { Injectable } from '@nestjs/common';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';
import { PricingPlanModel } from '../models/PricingPlanModel';

@Injectable()
export class PricingPlanDbConnector {
  constructor() {}

  public async create(pricingPlan: PricingPlanModel) {
    try {
      return await PricingPlanModel.create(pricingPlan);
    } catch (error) {
      throw new DatabaseError('Failed to save pricing plan').InnerError(error);
    }
  }

  public async findByTitle(title: string) {
    try {
      return await PricingPlanModel.findOne({ where: { title } });
    } catch (error) {
      throw new DatabaseError(
        `Failed to find pricing plan by title: ${title}`,
      ).InnerError(error);
    }
  }
}
