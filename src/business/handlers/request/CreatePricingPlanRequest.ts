import { PricingPlanDto } from 'src/dto/PricingPlanDto';
import CommandRequest from './CommandRequest';

export default interface CreatePricingPlanRequest extends CommandRequest {
  plan: PricingPlanDto;
}
