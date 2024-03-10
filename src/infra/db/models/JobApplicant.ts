import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { JobApplication } from './JobApplication';
import * as moment from 'moment';

@Table({ tableName: 'job_applicant' })
export class JobApplicant extends Model<JobApplicant> {
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
  })
  email: string;

  @Column({
    type: DataType.STRING,
    field: 'phone',
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'experience',
  })
  experience: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'resume',
  })
  resume: string;

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

  @HasMany(() => JobApplication, 'job_applicant_id')
  jobApplication: JobApplication;
}
