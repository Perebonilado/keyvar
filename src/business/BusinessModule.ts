import { Module } from '@nestjs/common';
import { InfraRepositoryModule } from 'src/infra/db/InfraRepositoryModule';
import { QueryModule } from 'src/query/QueryModule';
import CreateNewsInsightSubscriberHandler from './handlers/NewsInsight/CreateNewsInsightSubscriber';
import KeyvarEventEmitter from './events/KeyvarEventEmitter';

@Module({
  imports: [QueryModule, InfraRepositoryModule],
  providers: [KeyvarEventEmitter, CreateNewsInsightSubscriberHandler],
  exports: [KeyvarEventEmitter, CreateNewsInsightSubscriberHandler],
})
export class BusinessModule {}
