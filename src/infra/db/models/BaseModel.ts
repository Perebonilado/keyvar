import { Column, Model, DataType } from 'sequelize-typescript';
import dayjs from 'DayJsConfig';

export class BaseModel extends Model<BaseModel> {
  @Column({
    type: DataType.DATE,
    field: 'created_on',
    allowNull: true,
    defaultValue: dayjs.utc().toDate(),
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
}
