import { Inject, Injectable } from '@nestjs/common';
import QueryError from 'src/error-handlers/query/QueryError';
import { NewsInsightDbConnector } from 'src/infra/db/connectors/NewsInsightDbConnector';

@Injectable()
export class NewsInsightQueryService {
  constructor(
    @Inject(NewsInsightDbConnector) private dbConnector: NewsInsightDbConnector,
  ) {}

  public async findOneByEmail(email: string) {
    try {
      return await this.dbConnector.findOneByEmail(email);
    } catch (error) {
      throw new QueryError(
        'Failed to find insight subscriber by email',
      ).InnerError(error);
    }
  }
}
