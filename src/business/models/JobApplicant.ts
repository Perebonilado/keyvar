import { JobApplicantCreated } from '../events/Job/JobApplicantCreated';
import { AbstractDomain } from './AbstractDomain';

export class JobApplicant extends AbstractDomain {
  private _id?: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone?: string;
  private _experience: string;
  private _resume: string;
  private _isWorkAuthorization: boolean;
  private _createdOn?: Date;
  private _createdBy?: string;
  private _modifiedBy?: string;
  private _modifiedOn?: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    experience: string,
    resume: string,
    isWorkAuthorization: boolean,
    id?: string,
    phone?: string,
    createdOn?: Date,
    createdBy?: string,
    modifiedBy?: string,
    modifiedOn?: Date,
  ) {
    super();

    this._firstName = firstName;

    this._lastName = lastName;

    this._email = email;

    this._id = id;

    this._experience = experience;

    this._isWorkAuthorization = isWorkAuthorization;

    this._resume = resume;

    this._phone = phone;

    this._createdBy = createdBy;

    this._createdOn = createdOn;

    this._modifiedBy = modifiedBy;

    this._modifiedOn = modifiedOn;
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get experience(): string {
    return this._experience;
  }

  get isWorkAuthorization(): boolean {
    return this._isWorkAuthorization;
  }

  get resume(): string {
    return this._resume;
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
    this._events.push(new JobApplicantCreated(this));
  }
}
