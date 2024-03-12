import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { NewsInsightDbConnector } from './connectors/NewsInsightDbConnector';
import { BusinessEnquiryDbConnector } from './connectors/BusinessEnquiryDbConnector';
import { BusinessLeadDbConnector } from './connectors/BusinessLeadDbConnector';
import { JobDbConnector } from './connectors/JobDbConnector';

@Module({
  providers: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
    JobDbConnector
  ],
  exports: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
    JobDbConnector
  ],
})
export class InfraDbModule {}
