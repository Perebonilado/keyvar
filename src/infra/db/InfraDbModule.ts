import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { NewsInsightDbConnector } from './connectors/NewsInsightDbConnector';
import { BusinessEnquiryDbConnector } from './connectors/BusinessEnquiryDbConnector';
import { BusinessLeadDbConnector } from './connectors/BusinessLeadDbConnector';

@Module({
  providers: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
  ],
  exports: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
  ],
})
export class InfraDbModule {}
