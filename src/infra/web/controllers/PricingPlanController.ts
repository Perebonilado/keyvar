import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { CreatePricingPlanHandler } from 'src/business/handlers/PricingPlans/CreatePricingPlanHandler';
import { PricingPlanDto } from 'src/dto/PricingPlanDto';
import { PricingPlanQueryService } from 'src/query/PricingPlanQueryService';
import { CreateServiceValidationSchema } from '../zod-validation-schemas/ServiceValidationSchema';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.pipe';

@Controller('pricing-plan')
export class PricingPlanController {
  constructor(
    @Inject(CreatePricingPlanHandler)
    private createPricingPlanHandler: CreatePricingPlanHandler,
    @Inject(PricingPlanQueryService)
    private pricingPlanQueryService: PricingPlanQueryService,
  ) {}

  @Post('/create-plan')
  @UsePipes(new ZodValidationPipe(CreateServiceValidationSchema))
  public async createPricingPlan(@Body() body: PricingPlanDto) {
    try {
      const createdPricingPlan = await this.createPricingPlanHandler.handle({
        plan: body,
      });

      return await this.pricingPlanQueryService.findPricingPlanByTitle(
        createdPricingPlan.pricingPlan.title,
      );
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to create pricing plan',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('')
  public async retrieveAllActivePricingPlans() {
    try {
      return await this.pricingPlanQueryService.findAllActivePricingPlans();
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to find pricing plans',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
