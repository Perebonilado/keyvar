import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BeforeCreate,
} from 'sequelize-typescript';
import { BusinessLeadModel } from './BusinessLeadModel';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';

@Table({ tableName: 'business_enquiry' })
export class BusinessEnquiryModel extends Model<BusinessEnquiryModel> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'enquiry',
  })
  enquiry: string;

  @ForeignKey(() => BusinessLeadModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'business_lead_id',
  })
  businessLeadId: string;

  @Column({
    type: DataType.DATE,
    field: 'created_on',
    allowNull: true,
    defaultValue: moment(new Date()).utc().toDate(),
  })
  createdOn: Date;

  @Column({
    type: DataType.BIGINT,
    field: 'created_by',
    allowNull: true,
  })
  createdBy: number;

  @Column({ type: DataType.DATE, field: 'modified_on', allowNull: true })
  modifiedOn: Date;

  @Column({ type: DataType.BIGINT, field: 'modified_by', allowNull: true })
  modifiedBy: number;

  @BeforeCreate
  static addUUID(instance: BusinessEnquiryModel) {
    instance.id = generateUUID();
  }
}
