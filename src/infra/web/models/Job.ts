import { JobStatusEnum } from './JobStatus';

export interface JobApplicationWebModel {
  id: string;
  jobStatus: JobStatusEnum;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  jobApplicantId: string;
  jobRoleId: string;
}
