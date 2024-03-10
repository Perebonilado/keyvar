import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { JobApplicant } from './JobApplicant';

@Table({ tableName: 'job_role' })
export class JobRole extends Model<JobRole, BaseModel> {
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
    field: 'title',
  })
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'is_active',
  })
  isActive: boolean;

  @HasMany(() => JobApplicant)
  jobApplicant: JobApplicant;
}
