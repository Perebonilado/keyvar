import { Module } from '@nestjs/common';
import { InfraRepositoryModule } from 'src/infra/db/InfraRepositoryModule';
import { QueryModule } from 'src/query/QueryModule';
import CreateNewsInsightSubscriberHandler from './handlers/NewsInsight/CreateNewsInsightSubscriberHandler';
import KeyvarEventEmitter from './events/KeyvarEventEmitter';
import { CreateBusinessLeadHandler } from './handlers/BusinessLead/CreateBusinessLeadHandler';

@Module({
  imports: [QueryModule, InfraRepositoryModule],
  providers: [
    KeyvarEventEmitter,
    CreateNewsInsightSubscriberHandler,
    CreateBusinessLeadHandler,
  ],
  exports: [
    KeyvarEventEmitter,
    CreateNewsInsightSubscriberHandler,
    CreateBusinessLeadHandler,
  ],
})
export class BusinessModule {}
