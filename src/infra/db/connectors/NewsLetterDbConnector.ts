import { Injectable } from '@nestjs/common';
import { NewsInsightSubscriber } from '../models/NewsInsightSubscriber';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';

@Injectable()
export class NewsLetterDbConnector {
  public async subscribe(
    subscriber: NewsInsightSubscriber,
  ): Promise<NewsInsightSubscriber> {
    try {
      return await NewsInsightSubscriber.create(subscriber);
    } catch (error) {
      throw new DatabaseError('Failed to save subscriber to db').InnerError(
        error,
      );
    }
  }
}
