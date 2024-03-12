import { Inject } from '@nestjs/common';
import { JobRepository } from 'src/business/repository/JobRepository';
import { JobDbConnector } from '../connectors/JobDbConnector';
import { JobApplicant } from 'src/business/models/JobApplicant';
import { JobApplicantModel } from '../models/JobApplicantModel';
import { JobApplication } from 'src/business/models/JobApplication';
import { JobApplicationModel } from '../models/JobApplicationModel';
import RepositoryError from 'src/error-handlers/infra/RepositoryError';

export class JobSequalizeRepository implements JobRepository {
  constructor(@Inject(JobDbConnector) private dbConnect: JobDbConnector) {}

  public async createJobApplicant(
    applicant: JobApplicant,
  ): Promise<JobApplicantModel> {
    try {
      return await this.dbConnect.createJobApplicant({} as JobApplicantModel);
    } catch (error) {
      throw new RepositoryError('Error saving applicant').InnerError(error);
    }
  }

  public async createJobApplication(
    application: JobApplication,
  ): Promise<JobApplicationModel> {
    try {
      return await this.dbConnect.createJobApplication({} as JobApplicationModel)
    } catch (error) {
      throw new RepositoryError('Error saving application').InnerError(error);
    }
  }
}
