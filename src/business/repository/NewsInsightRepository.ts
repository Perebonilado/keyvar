import { NewsInsightSubscriber } from '../models/NewsInsightSubscriber';
import { NewsInsightSubscriberModel } from 'src/infra/db/models/NewsInsightSubscriberModel';

export const NewsInsightRepository = Symbol('NewsInsightRepository');
export interface NewsInsightRepository {
  create(
    subscriber: NewsInsightSubscriber,
  ): Promise<NewsInsightSubscriberModel>;
}
