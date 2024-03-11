import { Table, Column, Model, DataType, HasMany, BeforeCreate } from 'sequelize-typescript';
import { JobApplicationModel } from './JobApplicationModel';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';

@Table({ tableName: 'job_applicant' })
export class JobApplicantModel extends Model<JobApplicantModel> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
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
    type: DataType.UUID,
    field: 'created_by',
    allowNull: true,
  })
  createdBy: string;

  @Column({ type: DataType.DATE, field: 'modified_on', allowNull: true })
  modifiedOn: Date;

  @Column({ type: DataType.UUID, field: 'modified_by', allowNull: true })
  modifiedBy: string;

  @HasMany(() => JobApplicationModel, 'job_applicant_id')
  jobApplication: JobApplicationModel;

  @BeforeCreate
  static addUUID(instance: JobApplicantModel) {
    instance.id = generateUUID();
  }
}
