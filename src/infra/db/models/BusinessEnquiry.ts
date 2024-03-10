import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { BusinessLead } from './BusinessLead';
import * as moment from 'moment';

@Table({ tableName: 'business_enquiry' })
export class BusinessEnquiry extends Model<BusinessEnquiry> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'enquiry',
  })
  enquiry: string;

  @ForeignKey(() => BusinessLead)
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
}
