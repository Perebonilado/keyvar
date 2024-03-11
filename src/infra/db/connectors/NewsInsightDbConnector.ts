import { Injectable } from '@nestjs/common';
import { NewsInsightSubscriberModel } from '../models/NewsInsightSubscriberModel';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';
import { NewsInsightSubscriberWebModel } from 'src/infra/web/models/NewsInsightSubscriber';

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
      const subscriber = await NewsInsightSubscriberModel.findOne({
        where: { email },
      });
      return subscriber;
    } catch (error) {
      throw new DatabaseError(
        'Failed to find news insight subscriber by email',
      ).InnerError(error);
    }
  }

  private toDomain(
    newsInsightSubscriber: NewsInsightSubscriberModel,
  ): NewsInsightSubscriberWebModel {
    return {
      id: newsInsightSubscriber.id,
      email: newsInsightSubscriber.email,
      createdOn: newsInsightSubscriber.createdOn,
    };
  }
}
