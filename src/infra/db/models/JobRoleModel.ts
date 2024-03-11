import { Table, Column, Model, DataType, HasMany, BeforeCreate } from 'sequelize-typescript';
import { JobApplicationModel } from './JobApplicationModel';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';

@Table({ tableName: 'job_role' })
export class JobRoleModel extends Model<JobRoleModel> {
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

  @HasMany(() => JobApplicationModel, 'job_role_id')
  jobApplication: JobApplicationModel;

  @BeforeCreate
  static addUUID(instance: JobRoleModel) {
    instance.id = generateUUID();
  }
}
