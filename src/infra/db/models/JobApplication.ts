import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { JobApplicant } from './JobApplicant';
import { JobRole } from './JobRole';
import { JobStatusEnum } from 'src/infra/web/models/JobStatus';

@Table({ tableName: 'job_application' })
export class JobApplication extends Model<JobApplication, BaseModel> {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
    field: 'job_status',
    type: DataType.INTEGER
  })
  jobStatus: JobStatusEnum

  @ForeignKey(() => JobApplicant)
  @Column({
    field: 'job_applicant_id',
    type: DataType.UUIDV4,
    allowNull: false,
  })
  jobApplicantId: string;

  @ForeignKey(() => JobRole)
  @Column({
    field: 'job_role_id',
    type: DataType.UUIDV4,
    allowNull: false,
  })
  jobRoleId: string;

}
