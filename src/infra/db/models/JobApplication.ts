import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { JobApplicant } from './JobApplicant';
import { JobRole } from './JobRole';
import { JobStatusEnum } from 'src/infra/web/models/JobStatus';
import * as moment from 'moment';

@Table({ tableName: 'job_application' })
export class JobApplication extends Model<JobApplication> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
    field: 'job_status',
    type: DataType.INTEGER
  })
  jobStatus: JobStatusEnum

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

  @ForeignKey(() => JobApplicant)
  @Column({
    field: 'job_applicant_id',
    type: DataType.UUID,
    allowNull: false,
  })
  jobApplicantId: string;

  @ForeignKey(() => JobRole)
  @Column({
    field: 'job_role_id',
    type: DataType.UUID,
    allowNull: false,
  })
  jobRoleId: string;

}
