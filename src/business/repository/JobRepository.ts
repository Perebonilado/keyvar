import { JobApplicationModel } from 'src/infra/db/models/JobApplicationModel';
import { JobApplication } from '../models/JobApplication';
import { JobApplicant } from '../models/JobApplicant';
import { JobApplicantModel } from 'src/infra/db/models/JobApplicantModel';
import { JobRole } from '../models/JobRole';
import { JobRoleModel } from 'src/infra/db/models/JobRoleModel';

export const JobRepository = Symbol('JobRepository');

export interface JobRepository {
  createJobApplication(
    application: JobApplication,
  ): Promise<JobApplicationModel>;
  createJobApplicant(applicant: JobApplicant): Promise<JobApplicantModel>;
  createJobRole(role: JobRole): Promise<JobRoleModel>;
}
