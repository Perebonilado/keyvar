import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript';
import * as moment from 'moment';
import { NewsInsightSubscriber } from 'src/business/models/NewsInsightSubscriber';
import { generateUUID } from 'src/utils';

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
    unique: true
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

  static toDomain(
    newsInsightSubscriber: NewsInsightSubscriberModel,
  ): NewsInsightSubscriber {
    return new NewsInsightSubscriber(
      newsInsightSubscriber.id,
      newsInsightSubscriber.email,
      newsInsightSubscriber.createdOn,
    );
  }
}
