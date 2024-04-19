import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import CreateServiceRequest from '../request/CreateServiceRequest';
import CreateServiceResponse from '../response/CreateServiceResponse';
import { ServiceCreated } from 'src/business/events/Service/ServiceCreated';
import { Transaction } from 'sequelize';
import { ServicesQueryService } from 'src/query/ServicesQueryService';
import { Service } from 'src/business/models/Service';
import { ServiceRepository } from 'src/business/repository/ServiceRepository';

@Injectable()
export default class CreateServiceHandler extends AbstractRequestHandlerTemplate<
  CreateServiceRequest,
  CreateServiceResponse
> {
  constructor(
    @Inject(ServicesQueryService)
    private servicesQueryService: ServicesQueryService,
    @Inject(ServiceRepository) private serviceRepository: ServiceRepository,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateServiceRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const serviceExsits = await this.servicesQueryService.findServiceByTitle(
        request.service.title,
      );

      if (serviceExsits) {
        throw new HttpException(
          `Serivce already exists with title ${request.service.title}`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const { service } = request;
        const newService = new Service(
          service.title,
          service.description,
          service.targetAudience,
          service.price,
          service.isActive,
        );

        newService.create();

        await this.serviceRepository.create(newService);

        return newService.events;
      }
    } catch (error) {
      throw new HandlerError('Failed to handle service creation').InnerError(
        error,
      );
    }
  }

  public createRequestResponse(
    events: ServiceCreated[],
  ): CreateServiceResponse {
    return new CreateServiceResponse(this.createdService(events));
  }

  public createdService(events: ServiceCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof ServiceCreated,
    );

    return createdEvents[0].service;
  }
}
