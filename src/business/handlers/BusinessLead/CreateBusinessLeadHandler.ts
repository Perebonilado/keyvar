import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import CreateBusinessLeadRequest from '../request/CreateNewBusinessLeadRequest';
import CreateBusinessLeadResponse from '../response/CreateBusinessLeadResponse';
import { BusinessLeadRepository } from 'src/business/repository/BusinessLeadRepository';
import { Transaction } from 'sequelize';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { BusinessLeadQueryService } from 'src/query/BusinessLeadQueryService';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import { BusinessLead } from 'src/business/models/BusinessLead';
import { BusinessLeadCreated } from 'src/business/events/BusinessLead/BusinessLeadCreated';

@Injectable()
export class CreateBusinessLeadHandler extends AbstractRequestHandlerTemplate<
  CreateBusinessLeadRequest,
  CreateBusinessLeadResponse
> {
  constructor(
    @Inject(BusinessLeadRepository)
    private businessLeadRepository: BusinessLeadRepository,
    @Inject(BusinessLeadQueryService)
    private businessLeadQueryService: BusinessLeadQueryService,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateBusinessLeadRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const existingBusinessLead =
        await this.businessLeadQueryService.findByEmail(request.payload.email);

      if (existingBusinessLead) {
        throw new HttpException(
          'Business lead already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const {
        email,
        firstName,
        lastName,
        createdBy,
        createdOn,
        id,
        modifiedBy,
        modifiedOn,
        phone,
      } = request.payload;
      const newBusinessLead = new BusinessLead(
        firstName,
        lastName,
        email,
        id,
        phone,
        createdOn,
        createdBy,
        modifiedBy,
        modifiedOn,
      );

      newBusinessLead.create();

      await this.businessLeadRepository.create(newBusinessLead);

      return newBusinessLead.events;
    } catch (error) {
      throw new HandlerError(
        'Failed to handle business lead creation',
      ).InnerError(error);
    }
  }

  public createRequestResponse(
    events: BusinessLeadCreated[],
  ): CreateBusinessLeadResponse {
    return new CreateBusinessLeadResponse(
      this.createdNewInsightSubscriber(events),
    );
  }

  public createdNewInsightSubscriber(events: BusinessLeadCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof BusinessLeadCreated,
    );

    return createdEvents[0].businessLead;
  }
}
