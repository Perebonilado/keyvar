import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BeforeCreate,
} from 'sequelize-typescript';
import { JobApplicantModel } from './JobApplicantModel';
import { JobRoleModel } from './JobRoleModel';
import { JobStatusEnum } from 'src/infra/web/models/JobStatus';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';

@Table({ tableName: 'job_application' })
export class JobApplicationModel extends Model<JobApplicationModel> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
    field: 'job_status',
    type: DataType.INTEGER,
  })
  jobStatus: JobStatusEnum;

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

  @ForeignKey(() => JobApplicantModel)
  @Column({
    field: 'job_applicant_id',
    type: DataType.UUID,
    allowNull: false,
  })
  jobApplicantId: string;

  @ForeignKey(() => JobRoleModel)
  @Column({
    field: 'job_role_id',
    type: DataType.UUID,
    allowNull: false,
  })
  jobRoleId: string;

  @BeforeCreate
  static addUUID(instance: JobApplicationModel) {
    instance.id = generateUUID();
  }
}
