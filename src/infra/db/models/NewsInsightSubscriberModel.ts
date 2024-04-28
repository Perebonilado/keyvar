import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
import * as moment from 'moment';
import { generateUUID } from 'src/utils';
import { NewsInsightSubscriberWebModel } from 'src/infra/web/models/NewsInsightSubscriber';

@Table({ tableName: 'news_insight_subscriber' })
export class NewsInsightSubscriberModel extends Model<NewsInsightSubscriberModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.DATE,
    field: 'created_on',
    allowNull: true,
    defaultValue: moment(new Date()).utc().toDate(),
  })
  createdOn?: Date;

  @BeforeCreate
  static addUUID(instance: NewsInsightSubscriberModel) {
    instance.id = generateUUID();
  }

  public toDomain(): NewsInsightSubscriberWebModel {
    return {
      id: this.id,
      email: this.email,
      createdOn: this.createdOn,
    };
  }
}
