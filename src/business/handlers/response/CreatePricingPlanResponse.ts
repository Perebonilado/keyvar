import { PricingPlan } from 'src/business/models/PricingPlan';
import CommandResponse from './CommandResponse';

export default class CreatePricingPlanResponse extends CommandResponse {
  readonly pricingPlan: PricingPlan;

  constructor(pricingPlan: PricingPlan) {
    super(pricingPlan.events);
    this.pricingPlan = pricingPlan;
  }
}
