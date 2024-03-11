import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { NewsInsightDbConnector } from './connectors/NewsInsightDbConnector';
import { BusinessEnquiryDbConnector } from './connectors/BusinessEnquiryDbConnector';

@Module({
  providers: [...databaseProviders, NewsInsightDbConnector, BusinessEnquiryDbConnector],
  exports: [...databaseProviders, NewsInsightDbConnector, BusinessEnquiryDbConnector],
})
export class InfraDbModule {}
