import { NewsInsightSubscriberCreated } from '../events/NewsInsight/NewsInsightSubscriberCreated';
import { AbstractDomain } from './AbstractDomain';

export class NewsInsightSubscriber extends AbstractDomain {
  private _id?: string;
  private _email: string;
  private _createdOn?: Date;

  constructor(email: string, id?: string, createdOn?: Date) {
    super();

    this._id = id;

    this._email = email;

    this._createdOn = createdOn;
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

  create(): void {
    this._events.push(new NewsInsightSubscriberCreated(this));
  }
}
