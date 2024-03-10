import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { JobApplication } from './JobApplication';
import * as moment from 'moment';

@Table({ tableName: 'job_role' })
export class JobRole extends Model<JobRole> {
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
    field: 'title',
  })
  title: string;

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
    type: DataType.BIGINT,
    field: 'created_by',
    allowNull: true,
  })
  createdBy: number;

  @Column({ type: DataType.DATE, field: 'modified_on', allowNull: true })
  modifiedOn: Date;

  @Column({ type: DataType.BIGINT, field: 'modified_by', allowNull: true })
  modifiedBy: number;

  @HasMany(() => JobApplication, 'job_role_id')
  jobApplication: JobApplication;

}
