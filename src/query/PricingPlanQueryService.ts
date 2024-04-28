import { Injectable } from '@nestjs/common';
import QueryError from 'src/error-handlers/query/QueryError';
import { PricingPlanModel } from 'src/infra/db/models/PricingPlanModel';

@Injectable()
export class PricingPlanQueryService {
  public async findPricingPlanByTitle(title: string) {
    try {
      return await PricingPlanModel.findOne({ where: { title } });
    } catch (error) {
      throw new QueryError(
        `Failed to find pricing plan by title: ${title}`,
      ).InnerError(error);
    }
  }

  public async findAllActivePricingPlans() {
    try {
      return await PricingPlanModel.findAll({ where: { isActive: true } });
    } catch (error) {
      throw new QueryError(`Failed to find active pricing plans`).InnerError(error);
    }
  }
}
