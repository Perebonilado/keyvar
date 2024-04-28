import { JobRole } from 'src/business/models/JobRole';
import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';

export class JobRoleCreated extends BusinessEvent {
    readonly jobRole: JobRole;

    constructor(jobRole: JobRole) {
        super(BusinessEventType.JOB_ROLE_CREATED)
        this.jobRole = jobRole
    }
}