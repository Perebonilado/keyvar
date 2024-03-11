import { NewsInsightSubscriberCreated } from '../events/NewsInsight/NewsInsightSubscriberCreated';
import { AbstractDomain } from './AbstractDomain';

export class NewsInsightSubscriber extends AbstractDomain {
  private _id?: string;
  private _email: string;
  private _createdOn?: Date;
  private _createdBy?: string;
  private _modifiedOn?: Date;
  private _modifiedBy?: number;

  constructor(
    email: string,
    id?: string,
    createdOn?: Date,
    createdBy?: string,
    modifiedOn?: Date,
    modifiedBy?: number,
  ) {
    super();

    this._id = id;

    this._email = email;

    this._createdOn = createdOn;

    this._createdBy = createdBy;

    this._modifiedOn = modifiedOn;

    this._modifiedBy = modifiedBy;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  get modifiedBy(): number {
    return this._modifiedBy;
  }

  create(): void {
    this._events.push(new NewsInsightSubscriberCreated(this));
  }
}
