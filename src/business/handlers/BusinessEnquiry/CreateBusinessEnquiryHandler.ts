import { Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import CreateNewBusinessEnquiryRequest from '../request/CreateNewBusinessEnquiryRequest';
import CreateBusinessEnquiryResponse from '../response/CreateBusinessEnquiryResponse';
import { Transaction } from 'sequelize';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import { BusinessLeadQueryService } from 'src/query/BusinessLeadQueryService';
import { CreateBusinessLeadHandler } from '../BusinessLead/CreateBusinessLeadHandler';
import { BusinessEnquiry } from 'src/business/models/BusinessEnquiry';
import { BusinessEnquiryRepository } from 'src/business/repository/BusinessEnquiryRepository';
import { BusinessEnquiryCreated } from 'src/business/events/BusinessEnquiry/BusinessEnquiryCreated';

@Injectable()
export class CreateBusinessEnquiryHandler extends AbstractRequestHandlerTemplate<
  CreateNewBusinessEnquiryRequest,
  CreateBusinessEnquiryResponse
> {
  constructor(
    @Inject(BusinessLeadQueryService)
    private businessLeadQueryService: BusinessLeadQueryService,
    @Inject(CreateBusinessLeadHandler)
    private createBusinessLeadHandler: CreateBusinessLeadHandler,
    @Inject(BusinessEnquiryRepository)
    private businessEnquiryRepository: BusinessEnquiryRepository,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateNewBusinessEnquiryRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const { email, firstName, lastName, phone, enquiry, service } =
        request.payload;
      const existingBusinessLead =
        await this.businessLeadQueryService.findByEmail(email);

      if (!existingBusinessLead) {
        await this.createBusinessLeadHandler.handle({
          payload: {
            email: email.toLowerCase(),
            firstName: firstName,
            lastName: lastName,
            phone: phone,
          },
        });

        const createdLead =
          await this.businessLeadQueryService.findByEmail(email);

        const newBusinessEnquiry = new BusinessEnquiry(
          enquiry,
          createdLead.id,
          service,
        );

        newBusinessEnquiry.create();

        await this.businessEnquiryRepository.create(newBusinessEnquiry);

        return newBusinessEnquiry.events;
      }

      const newBusinessEnquiry = new BusinessEnquiry(
        enquiry,
        existingBusinessLead.id,
        service,
      );
      newBusinessEnquiry.create();

      await this.businessEnquiryRepository.create(newBusinessEnquiry);

      return newBusinessEnquiry.events;
    } catch (error) {
      throw new HandlerError('Failed to create business enquiry').InnerError(
        error,
      );
    }
  }

  public createRequestResponse(
    events: BusinessEnquiryCreated[],
  ): CreateBusinessEnquiryResponse {
    return new CreateBusinessEnquiryResponse(
      this.createdNewBusinessEnquiry(events),
    );
  }

  public createdNewBusinessEnquiry(events: BusinessEnquiryCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof BusinessEnquiryCreated,
    );

    return createdEvents[0].businessEnquiry;
  }
}
