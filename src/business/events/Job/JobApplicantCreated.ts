import { JobApplicant } from 'src/business/models/JobApplicant';
import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';

export class JobApplicantCreated extends BusinessEvent {
  readonly jobApplicant: JobApplicant;

  constructor(jobApplicant: JobApplicant) {
    super(BusinessEventType.JOB_APPLICANT_CREATED);
    this.jobApplicant = jobApplicant;
  }
}
