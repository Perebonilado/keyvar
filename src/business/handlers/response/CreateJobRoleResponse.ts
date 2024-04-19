import { JobRole } from 'src/business/models/JobRole';
import CommandResponse from './CommandResponse';

export default class CreateJobRoleResponse extends CommandResponse {
  readonly jobRole: JobRole;

  constructor(jobRole: JobRole) {
    super(jobRole.events);
    this.jobRole = jobRole;
  }
}
