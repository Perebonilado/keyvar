import { Inject } from '@nestjs/common';
import { NewsInsightSubscriber } from 'src/business/models/NewsInsightSubscriber';
import { NewsInsightRepository } from 'src/business/repository/NewsInsightRepository';
import { NewsInsightDbConnector } from '../connectors/NewsInsightDbConnector';
import RepositoryError from 'src/error-handlers/infra/RepositoryError';
import { NewsInsightSubscriberModel } from '../models/NewsInsightSubscriberModel';

export class NewsInsightSequalizeRepository implements NewsInsightRepository {
  constructor(
    @Inject(NewsInsightDbConnector) private dbConnector: NewsInsightDbConnector,
  ) {}

  async create(subscriber: NewsInsightSubscriber) {
    try {
      return await this.dbConnector.create({
        email: subscriber.email,
      } as NewsInsightSubscriberModel);
    } catch (error) {
      throw new RepositoryError(
        'Failed to create news insight subscriber',
      ).InnerError(error);
    }
  }
}
