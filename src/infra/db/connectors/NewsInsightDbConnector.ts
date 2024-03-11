import { Injectable } from '@nestjs/common';
import { NewsInsightSubscriberModel } from '../models/NewsInsightSubscriberModel';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';

@Injectable()
export class NewsInsightDbConnector {
  public async create(
    subscriber: NewsInsightSubscriberModel,
  ): Promise<NewsInsightSubscriberModel> {
    try {
      return await NewsInsightSubscriberModel.create(subscriber);
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Failed to save subscriber to db').InnerError(
        error,
      );
    }
  }
}
