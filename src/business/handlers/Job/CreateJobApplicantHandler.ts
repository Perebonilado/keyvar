import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import CreateJobApplicantRequest from '../request/CreateJobApplicationRequest';
import CreateJobApplicantResponse from '../response/CreateJobApplicantResponse';
import { Transaction } from 'sequelize';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import { JobApplicantCreated } from 'src/business/events/Job/JobApplicantCreated';
import { JobQueryService } from 'src/query/JobQueryService';
import { JobApplicant } from 'src/business/models/JobApplicant';
import { JobRepository } from 'src/business/repository/JobRepository';

@Injectable()
export class CreateJobApplicantHandler extends AbstractRequestHandlerTemplate<
  CreateJobApplicantRequest,
  CreateJobApplicantResponse
> {
  constructor(
    @Inject(JobQueryService) private jobQueryService: JobQueryService,
    @Inject(JobRepository) private jobRepository: JobRepository,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateJobApplicantRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const existingJobApplicant =
        await this.jobQueryService.findJobApplicantByEmail(
          request.payload.email,
        );

      if (!existingJobApplicant) {
        const {
          email,
          experience,
          firstName,
          isWorkAuthorization,
          lastName,
          resume,
        } = request.payload;
        const newApplicant = new JobApplicant(
          firstName,
          lastName,
          email,
          experience,
          resume,
          isWorkAuthorization,
        );

        newApplicant.create();

        await this.jobRepository.createJobApplicant(newApplicant);

        return newApplicant.events;
      }

      throw new HttpException(
        'Job Applicant already exists',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HandlerError(
        'Failed to handle job applicant creation',
      ).InnerError(error);
    }
  }

  public createRequestResponse(
    events: JobApplicantCreated[],
  ): CreateJobApplicantResponse {
    return new CreateJobApplicantResponse(this.createdNewJobApplicant(events));
  }

  public createdNewJobApplicant(events: JobApplicantCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof JobApplicantCreated,
    );

    return createdEvents[0].jobApplicant;
  }
}
