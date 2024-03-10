import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BusinessLead } from './BusinessLead';
import { Service } from './Service';

@Table({ tableName: 'business_enquiry' })
export class BusinessEnquiry extends Model<BusinessEnquiry, BaseModel> {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'enquiry',
  })
  enquiry: string;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'service_id',
  })
  serviceId: string;

  @ForeignKey(() => BusinessLead)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'business_lead_id',
  })
  businessLeadId: string;
}
