import { PricingPlanModel } from 'src/infra/db/models/PricingPlanModel';
import { PricingPlan } from '../models/PricingPlan';

export const PricingPlanRepository = Symbol('PricingPlanRepository');
export interface PricingPlanRepository {
  create(pricingPlan: PricingPlan): Promise<PricingPlanModel>;
}
