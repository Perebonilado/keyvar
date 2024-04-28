import { JobStatusEnum } from 'src/infra/web/models/JobStatus';
import { AbstractDomain } from './AbstractDomain';
import { JobApplicationCreated } from '../events/Job/JobApplicationCreated';

export class JobApplication extends AbstractDomain {
  private _id?: string;
  private _jobStatus: JobStatusEnum;
  private _jobApplicantId: string;
  private _jobRoleId: string;
  private _createdOn?: Date;
  private _createdBy?: string;
  private _modifiedBy?: string;
  private _modifiedOn?: Date;

  constructor(
    jobStatus: JobStatusEnum,
    jobApplicantId: string,
    jobRoleId: string,
    id?: string,
    createdOn?: Date,
    createdBy?: string,
    modifiedBy?: string,
    modifiedOn?: Date,
  ) {
    super();

    this._jobStatus = jobStatus;

    this._jobApplicantId = jobApplicantId;

    this._jobRoleId = jobRoleId;

    this._id = id;

    this._createdBy = createdBy;

    this._createdOn = createdOn;

    this._modifiedBy = modifiedBy;

    this._modifiedOn = modifiedOn;
  }

  get id(): string {
    return this._id;
  }

  get jobApplicantId(): string {
    return this._jobApplicantId;
  }

  get jobRoleId(): string {
    return this._jobRoleId;
  }

  get jobStatus(): JobStatusEnum {
    return this._jobStatus;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get modifiedBy(): string {
    return this._modifiedBy;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  create(): void {
    this._events.push(new JobApplicationCreated(this));
  }
}
