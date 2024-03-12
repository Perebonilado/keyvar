import { JobApplicationModel } from 'src/infra/db/models/JobApplicationModel';
import { JobApplication } from '../models/JobApplication';
import { JobApplicant } from '../models/JobApplicant';
import { JobApplicantModel } from 'src/infra/db/models/JobApplicantModel';

export const JobRepository = Symbol('JobRepository');

export interface JobRepository {
  createJobApplication(
    application: JobApplication,
  ): Promise<JobApplicationModel>;
  createJobApplicant(applicant: JobApplicant): Promise<JobApplicantModel>;
}
