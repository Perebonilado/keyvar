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
      throw new DatabaseError('Failed to save subscriber to db').InnerError(
        error,
      );
    }
  }

  public async findOneByEmail(email: string) {
    try {
      return await NewsInsightSubscriberModel.findOne({ where: { email } });
    } catch (error) {
      throw new DatabaseError(
        'Failed to find news insight subscriber by email',
      ).InnerError(error);
    }
  }
}
