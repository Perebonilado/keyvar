import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({ tableName: 'job_status' })
export class JobStatus extends Model<JobStatus, BaseModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;
}
