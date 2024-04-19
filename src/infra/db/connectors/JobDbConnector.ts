import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobApplicationModel } from '../models/JobApplicationModel';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';
import { JobApplicantModel } from '../models/JobApplicantModel';
import { JobRoleModel } from '../models/JobRoleModel';

@Injectable()
export class JobDbConnector {
  constructor() {}

  public async createJobApplication(jobApplication: JobApplicationModel) {
    try {
      return await JobApplicationModel.create(jobApplication);
    } catch (error) {
      throw new DatabaseError('Failed to save job application').InnerError(
        error,
      );
    }
  }

  public async createJobApplicant(applicant: JobApplicantModel) {
    try {
      return await JobApplicantModel.create(applicant);
    } catch (error) {
      throw new DatabaseError(
        'Failed to save job applicant information',
      ).InnerError(error);
    }
  }

  public async createJobRole(role: JobRoleModel) {
    try {
      return await JobRoleModel.create(role);
    } catch (error) {
      throw new DatabaseError('Failed to create job role').InnerError(error);
    }
  }
}
