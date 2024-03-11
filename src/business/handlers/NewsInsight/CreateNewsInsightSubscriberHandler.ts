import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import AbstractRequestHandlerTemplate from '../AbstractRequestHandlerTemplate';
import CreateNewsInsightSubscriberRequest from '../request/CreateNewsInsightSubscriberRequest';
import CreateNewsInsightSubscriberResponse from '../response/CreateNewInsightSubscriberResponse';
import { Transaction } from 'sequelize';
import { BusinessEvent } from 'src/business/events/BusinessEvent';
import { NewsInsightSubscriberCreated } from 'src/business/events/NewsInsight/NewsInsightSubscriberCreated';
import { NewsInsightRepository } from 'src/business/repository/NewsInsightRepository';
import { NewsInsightSubscriber } from 'src/business/models/NewsInsightSubscriber';
import { HandlerError } from 'src/error-handlers/business/HandlerError';
import { NewsInsightQueryService } from 'src/query/NewsInsigtQueryService';

@Injectable()
export default class CreateNewsInsightSubscriberHandler extends AbstractRequestHandlerTemplate<
  CreateNewsInsightSubscriberRequest,
  CreateNewsInsightSubscriberResponse
> {
  constructor(
    @Inject(NewsInsightRepository)
    private newsInsightRepository: NewsInsightRepository,
    @Inject(NewsInsightQueryService)
    private newsInsightQueryService: NewsInsightQueryService,
  ) {
    super();
  }

  public async handleRequest(
    request: CreateNewsInsightSubscriberRequest,
    transactionSequelize?: Transaction,
  ): Promise<BusinessEvent[]> {
    try {
      const subscriberExists =
        await this.newsInsightQueryService.findOneByEmail(
          request.subscriber.email,
        );

      if (subscriberExists) {
        throw new HttpException(
          'subscriber already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newInsightSubscriber = new NewsInsightSubscriber(
        request.subscriber.email.toLowerCase(),
      );

      newInsightSubscriber.create();

      await this.newsInsightRepository.create(newInsightSubscriber);

      return newInsightSubscriber.events;
    } catch (error) {
      throw new HandlerError(
        'Failed to handle new subscriber creation',
      ).InnerError(error);
    }
  }

  public createRequestResponse(
    events: NewsInsightSubscriberCreated[],
  ): CreateNewsInsightSubscriberResponse {
    return new CreateNewsInsightSubscriberResponse(
      this.createdNewInsightSubscriber(events),
    );
  }

  public createdNewInsightSubscriber(events: NewsInsightSubscriberCreated[]) {
    const createdEvents = events.filter(
      (event) => event instanceof NewsInsightSubscriberCreated,
    );

    return createdEvents[0].newsInsightSubscriber;
  }
}
