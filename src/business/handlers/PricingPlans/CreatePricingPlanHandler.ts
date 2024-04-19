import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import CreatedPricingPlanRequest from '../request/CreatePricingPlanRequest';
import CreatedPricingPlanResponse from '../response/CreatePricingPlanResponse';
import { PricingPlanCreated } from 'src/business/events/Service/PricingPlanCreated';
import { Transaction } from 'sequelize';
import { PricingPlanQueryService } from 'src/query/PricingPlanQueryService';
import { PricingPlan } from 'src/business/models/PricingPlan';
import { PricingPlanRepository } from 'src/business/repository/PricingPlanRepository';

@Injectable()
export class CreatePricingPlanHandler extends AbstractRequestHandlerTemplate<
  CreatedPricingPlanRequest,
  CreatedPricingPlanResponse
> {
  constructor(
    @Inject(PricingPlanQueryService)
    private pricingPlanQueryService: PricingPlanQueryService,
    @Inject(PricingPlanRepository)
    private pricingPlanRepository: PricingPlanRepository,
  ) {
    super();
  }

  public async handleRequest(
    request: CreatedPricingPlanRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const allowedCategoryTypes = ['individual', 'tailored'];

      if (allowedCategoryTypes.indexOf(request.plan.category) === -1) {
        throw new HttpException(
          'Invalid category type: category must be either individual or tailord',
          HttpStatus.BAD_REQUEST,
        );
      }

      const pricingPlanExsits =
        await this.pricingPlanQueryService.findPricingPlanByTitle(request.plan.title);

      if (pricingPlanExsits) {
        throw new HttpException(
          `Pricing Plan already exists with title ${request.plan.title}`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const { plan } = request;
        const newPlan = new PricingPlan(
          plan.title,
          plan.description,
          plan.targetAudience,
          plan.price,
          plan.isActive,
          plan.category,
        );

        newPlan.create();

        await this.pricingPlanRepository.create(newPlan);

        return newPlan.events;
      }
    } catch (error) {
      throw new HandlerError(
        'Failed to handle pricing plan creation',
      ).InnerError(error);
    }
  }

  public createRequestResponse(
    events: PricingPlanCreated[],
  ): CreatedPricingPlanResponse {
    return new CreatedPricingPlanResponse(this.createdPricingPlan(events));
  }

  public createdPricingPlan(events: PricingPlanCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof PricingPlanCreated,
    );

    return createdEvents[0].pricingPlan;
  }
}
