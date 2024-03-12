import { JobApplication } from 'src/business/models/JobApplication';
import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';

export class JobApplicationCreated extends BusinessEvent {
  readonly jobApplication: JobApplication;

  constructor(jobApplication: JobApplication) {
    super(BusinessEventType.JOB_APPLICATION_CREATED);
    this.jobApplication = jobApplication;
  }
}
