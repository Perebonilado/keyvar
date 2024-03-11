import { BusinessEnquiryCreated } from '../events/BusinessEnquiry/BusinessEnquiryCreated';
import { AbstractDomain } from './AbstractDomain';

export class BusinessEnquiry extends AbstractDomain {
  private _id?: string;
  private _enquiry: string;
  private _businessLeadId: string;
  private _createdOn?: Date;

  constructor(
    enquiry: string,
    businessLeadId: string,
    id?: string,
    createdOn?: Date,
  ) {
    super();

    this._id = id;

    this._businessLeadId = businessLeadId;

    this._enquiry = enquiry;

    this._createdOn = createdOn;
  }

  get id(): string {
    return this._id;
  }

  get enquiry(): string {
    return this._enquiry;
  }

  get businessLeadId(): string {
    return this._businessLeadId;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  create(): void {
    this._events.push(new BusinessEnquiryCreated(this));
  }
}
