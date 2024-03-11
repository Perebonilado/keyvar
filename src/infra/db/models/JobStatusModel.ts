import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';

@Table({ tableName: 'job_status' })
export class JobStatusModel extends Model<JobStatusModel> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
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
  static addUUID(instance: JobStatusModel) {
    instance.id = generateUUID();
  }
}
