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
import { ServicesEnum } from 'src/infra/web/models/Services';

@Table({ tableName: 'business_enquiry' })
export class BusinessEnquiryModel extends Model<BusinessEnquiryModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'enquiry',
  })
  enquiry: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'service',
  })
  service: ServicesEnum;

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

  @BeforeCreate
  static addUUID(instance: BusinessEnquiryModel) {
    instance.id = generateUUID();
  }

  public toDomain() {
    return {
      id: this.id,
      enquiry: this.enquiry,
      businessLeadId: this.businessLeadId,
      createdOn: this.createdOn,
    };
  }
}
