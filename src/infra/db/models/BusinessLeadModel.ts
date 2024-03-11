import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { BusinessEnquiryModel } from './BusinessEnquiryModel';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';
import { BusinessLeadWebModel } from 'src/infra/web/models/BusinessLead';

@Table({ tableName: 'business_lead' })
export class BusinessLeadModel extends Model<BusinessLeadModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name',
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name',
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    field: 'phone',
  })
  phone: string;

  @Column({
    type: DataType.DATE,
    field: 'created_on',
    allowNull: true,
    defaultValue: moment(new Date()).utc().toDate(),
  })
  createdOn: Date;

  @Column({
    type: DataType.UUID,
    field: 'created_by',
    allowNull: true,
  })
  createdBy: string;

  @Column({ type: DataType.DATE, field: 'modified_on', allowNull: true })
  modifiedOn: Date;

  @Column({ type: DataType.UUID, field: 'modified_by', allowNull: true })
  modifiedBy: string;

  @HasMany(() => BusinessEnquiryModel, 'business_lead_id')
  businessEnquiry: BusinessEnquiryModel;

  @BeforeCreate
  static addUUID(instance: BusinessLeadModel) {
    instance.id = generateUUID();
  }

  public toDomain(): BusinessLeadWebModel {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone ?? null,
      createdOn: this.createdOn ?? null,
      createdBy: this.createdBy ?? null,
      modifiedOn: this.modifiedOn ?? null,
      modifiedBy: this.modifiedBy ?? null,
    };
  }
}
