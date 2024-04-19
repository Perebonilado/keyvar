import { ServiceCreated } from '../events/Service/ServiceCreated';
import { AbstractDomain } from './AbstractDomain';

export class Service extends AbstractDomain {
  private _id?: string;
  private _title: string;
  private _description: string;
  private _targetAudience: string;
  private _price: number;
  private _isActive: boolean;
  private _createdOn?: Date;
  private _createdBy?: string;
  private _modifiedBy?: string;
  private _modifiedOn?: Date;

  constructor(
    title: string,
    description: string,
    targetAudience: string,
    price: number,
    isActive: boolean,
    id?: string,
    createdOn?: Date,
    createdBy?: string,
    modifiedBy?: string,
    modifiedOn?: Date,
  ) {
    super();

    this._title = title;

    this._description = description;

    this._targetAudience = targetAudience;

    this._price = price;

    this._isActive = isActive;

    this._id = id;

    this._createdBy = createdBy;

    this._createdOn = createdOn;

    this._modifiedBy = modifiedBy;

    this._modifiedOn = modifiedOn;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get targetAudience() {
    return this._targetAudience;
  }

  get price() {
    return this._price;
  }

  get isActive() {
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

  create(){
    this._events.push(new ServiceCreated(this))
  }
}
