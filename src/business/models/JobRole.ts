import { JobRoleCreated } from '../events/Job/JobRoleCreated';
import { AbstractDomain } from './AbstractDomain';

export class JobRole extends AbstractDomain {
  private _id?: string;
  private _title: string;
  private _isActive: boolean;
  private _createdOn?: Date;
  private _createdBy?: string;
  private _modifiedBy?: string;
  private _modifiedOn?: Date;

  constructor(
    title: string,
    isActive: boolean,
    id?: string,
    createdOn?: Date,
    createdBy?: string,
    modifiedBy?: string,
    modifiedOn?: Date,
  ) {
    super();

    this._title = title;

    this._isActive = isActive;

    this._id = id;

    this._createdBy = createdBy;

    this._createdOn = createdOn;

    this._modifiedBy = modifiedBy;

    this._modifiedOn = modifiedOn;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get isActive(): boolean {
    return this._isActive;
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

  create() {
    this._events.push(new JobRoleCreated(this));
  }
}
