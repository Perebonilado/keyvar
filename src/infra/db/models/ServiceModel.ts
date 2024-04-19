import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';

@Table({ tableName: 'service' })
export class ServiceModel extends Model<ServiceModel> {
  @Column({
    type: DataType.UUID,
    allowNull: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'target_audience',
  })
  targetAudience: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'price',
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'is_active',
  })
  isActive: boolean;

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

  @BeforeCreate
  static addUUID(instance: ServiceModel) {
    instance.id = generateUUID();
  }
}
