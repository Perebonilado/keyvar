import { Injectable, Inject } from '@nestjs/common';
import CommandRequest from './request/CommandRequest';
import { RequestHandler } from './RequestHandler';
import CommandResponse from './response/CommandResponse';
import { Transaction as SequelizeTransaction } from 'sequelize/types';
import { BusinessEvent } from '../events/BusinessEvent';
import KeyvarEventEmitter from '../events/KeyvarEventEmitter';

@Injectable()
export default abstract class AbstractRequestHandlerTemplate<
  T extends CommandRequest,
  U extends CommandResponse,
> implements RequestHandler<T, U>
{
  @Inject()
  private eventEmitter: KeyvarEventEmitter;

  protected abstract handleRequest(
    request: T,
    transactionSequelize?: SequelizeTransaction,
  ): Promise<BusinessEvent[]>;
  protected abstract createRequestResponse(events: BusinessEvent[]): U;

  async handle(
    request: T,
    transactionSequelize?: SequelizeTransaction,
  ): Promise<U> {
    const events: BusinessEvent[] = await this.handleRequest(
      request,
      transactionSequelize,
    );
    if (events && events.length > 0) {
      events.forEach((event: BusinessEvent) => {
        this.eventEmitter.emit(event.type, event);
      });
    }

    return this.createRequestResponse(events);
  }
}
