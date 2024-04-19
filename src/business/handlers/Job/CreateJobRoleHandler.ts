import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import CreateJobRoleResponse from '../response/CreateJobRoleResponse';
import { JobRepository } from 'src/business/repository/JobRepository';
import { Transaction } from 'sequelize';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { JobQueryService } from 'src/query/JobQueryService';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import CreateJobRoleRequest from '../request/CreateJobRoleRequest';
import { JobRole } from 'src/business/models/JobRole';
import { JobRoleCreated } from 'src/business/events/Job/JobRoleCreated';

@Injectable()
export class CreateJobRoleHandler extends AbstractRequestHandlerTemplate<
  CreateJobRoleRequest,
  CreateJobRoleResponse
> {
  constructor(
    @Inject(JobRepository) private jobRepository: JobRepository,
    @Inject(JobQueryService) private jobQueryService: JobQueryService,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateJobRoleRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const jobTitleExists = await this.jobQueryService.findJobRoleByTitle(
        request.payload.title,
      );

      const newJobRole = new JobRole(
        request.payload.title,
        request.payload.isActive,
      );

      if (jobTitleExists) {
        throw new HttpException(
          'Job Title Already Exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const createdJobRole =
          await this.jobRepository.createJobRole(newJobRole);

        newJobRole.create();

        return newJobRole.events;
      }
    } catch (error) {
      throw new HandlerError('Failed to handle job role creation').InnerError(
        error,
      );
    }
  }

  public createRequestResponse(
    events: JobRoleCreated[],
  ): CreateJobRoleResponse {
    return new CreateJobRoleResponse(this.createdNewJobRole(events));
  }

  public createdNewJobRole(events: JobRoleCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof JobRoleCreated,
    );

    return createdEvents[0].jobRole;
  }
}
