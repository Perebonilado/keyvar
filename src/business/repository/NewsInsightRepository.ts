import { NewsInsightSubscriber } from '../models/NewsInsightSubscriber';

export const NewsInsightRepository = Symbol('NewsInsightRepository')
export interface NewsInsightRepository {
  create(subscriber: NewsInsightSubscriber): Promise<NewsInsightSubscriber>;
}
