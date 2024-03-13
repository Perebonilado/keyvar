import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import CreateJobApplicationRequest from '../request/CreateJobApplicantRequest';
import CreateJobApplicationResponse from '../response/CreateJobApplicationResponse';
import { JobQueryService } from 'src/query/JobQueryService';
import { JobRepository } from 'src/business/repository/JobRepository';
import { Transaction } from 'sequelize';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import { JobApplicationCreated } from 'src/business/events/Job/JobApplicationCreated';
import { CreateJobApplicantHandler } from './CreateJobApplicantHandler';
import { JobApplication } from 'src/business/models/JobApplication';
import { JobStatusEnum } from 'src/infra/web/models/JobStatus';
import { StorageBucketService } from 'src/integrations/aws/services/StorageBucketService';

@Injectable()
export class CreateJobApplicationHandler extends AbstractRequestHandlerTemplate<
  CreateJobApplicationRequest,
  CreateJobApplicationResponse
> {
  constructor(
    @Inject(JobQueryService) private jobQueryService: JobQueryService,
    @Inject(JobRepository) private jobRepository: JobRepository,
    @Inject(CreateJobApplicantHandler)
    private createJobApplicationHandler: CreateJobApplicantHandler,
    @Inject(StorageBucketService)
    private storageBucketService: StorageBucketService,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateJobApplicationRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const existingApplicant =
        await this.jobQueryService.findJobApplicantByEmail(
          request.payload.email,
        );

      if (!existingApplicant) {
        if (!request.payload.resume) {
          throw new HttpException(
            'Please attach a resume',
            HttpStatus.BAD_REQUEST,
          );
        }

        const uploadedResume = await this.storageBucketService.uploadFile(
          request.payload.resume,
        );

        await this.createJobApplicationHandler.handle({
          payload: {
            email: request.payload.email,
            experience: request.payload.experience,
            firstName: request.payload.firstName,
            isWorkAuthorization: request.payload.isWorkAuthorization,
            lastName: request.payload.lastName,
            resume: uploadedResume.fileLocation,
          },
        });

        const createdApplicant =
          await this.jobQueryService.findJobApplicantByEmail(
            request.payload.email,
          );

        const newJobApplication = new JobApplication(
          JobStatusEnum.Inactive,
          createdApplicant.id,
          request.payload.roleId,
        );

        newJobApplication.create();

        await this.jobRepository.createJobApplication(newJobApplication);

        return newJobApplication.events;
      } else {
        const jobApplicationsByJobIdAndApplicantId =
          await this.jobQueryService.findAllJobApplicationsByJobIdAndApplicantId(
            existingApplicant.id,
            request.payload.roleId,
          );

        const isDuplicateApplication =
          jobApplicationsByJobIdAndApplicantId.some((application) => {
            return [
              JobStatusEnum.Accepted,
              JobStatusEnum.Active,
              JobStatusEnum.Inactive,
            ].includes(application.jobStatus);
          });

        if (isDuplicateApplication) {
          throw new HttpException(
            'Applicant already applied for this role',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          const newJobApplication = new JobApplication(
            JobStatusEnum.Inactive,
            existingApplicant.id,
            request.payload.roleId,
          );

          newJobApplication.create();

          await this.jobRepository.createJobApplication(newJobApplication);

          return newJobApplication.events;
        }
      }
    } catch (error) {
      throw new HandlerError(
        'Failed to handle job application creation',
      ).InnerError(error);
    }
  }

  public createRequestResponse(
    events: JobApplicationCreated[],
  ): CreateJobApplicationResponse {
    return new CreateJobApplicationResponse(
      this.createdNewJobApplication(events),
    );
  }

  public createdNewJobApplication(events: JobApplicationCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof JobApplicationCreated,
    );

    return createdEvents[0].jobApplication;
  }
}
