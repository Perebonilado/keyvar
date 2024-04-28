import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';
import { PricingPlan } from '../../models/PricingPlan';

export class PricingPlanCreated extends BusinessEvent {
  readonly pricingPlan: PricingPlan;

  constructor(pricingPlan: PricingPlan) {
    super(BusinessEventType.PRICING_PLAN_CREATED);

    this.pricingPlan = pricingPlan;
  }
}
