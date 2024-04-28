import { Inject } from '@nestjs/common';
import { PricingPlanRepository } from 'src/business/repository/PricingPlanRepository';
import { PricingPlanDbConnector } from '../connectors/PricingPlanDbConnector';
import { PricingPlan } from 'src/business/models/PricingPlan';
import { PricingPlanModel } from '../models/PricingPlanModel';
import RepositoryError from 'src/error-handlers/infra/RepositoryError';

export class PricingPlanSequalizeRepository implements PricingPlanRepository {
  constructor(
    @Inject(PricingPlanDbConnector) private pricingPlanDbConnector: PricingPlanDbConnector,
  ) {}

  public async create(plan: PricingPlan): Promise<PricingPlanModel> {
    try {
      return await this.pricingPlanDbConnector.create({
        title: plan.title,
        description: plan.description,
        targetAudience: plan.targetAudience,
        price: plan.price,
        isActive: plan.isActive,
        category: plan.category,
      } as PricingPlanModel);
    } catch (error) {
      throw new RepositoryError('Failed to create pricing plan').InnerError(error);
    }
  }
}
