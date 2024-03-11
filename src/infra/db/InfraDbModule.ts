import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { NewsInsightDbConnector } from './connectors/NewsInsightDbConnector';

@Module({
  providers: [...databaseProviders, NewsInsightDbConnector],
  exports: [...databaseProviders, NewsInsightDbConnector],
})
export class InfraDbModule {}
