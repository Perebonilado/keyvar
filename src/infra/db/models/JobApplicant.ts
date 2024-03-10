import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { JobApplication } from './JobApplication';

@Table({ tableName: 'job_applicant' })
export class JobApplicant extends Model<JobApplicant, BaseModel> {
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

  @HasMany(() => JobApplication, 'job_applicant_id')
  jobApplication: JobApplication;
}
