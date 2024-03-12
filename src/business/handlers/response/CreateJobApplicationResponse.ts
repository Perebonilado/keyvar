import { JobApplication } from 'src/business/models/JobApplication';
import CommandResponse from './CommandResponse';

export default class CreateJobApplicationResponse extends CommandResponse {
  readonly jobApplication: JobApplication;

  constructor(jobApplication: JobApplication) {
    super(jobApplication.events);
    this.jobApplication = jobApplication;
  }
}
