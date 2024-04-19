import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { NewsInsightDbConnector } from './connectors/NewsInsightDbConnector';
import { BusinessEnquiryDbConnector } from './connectors/BusinessEnquiryDbConnector';
import { BusinessLeadDbConnector } from './connectors/BusinessLeadDbConnector';
import { JobDbConnector } from './connectors/JobDbConnector';
import { ServiceDbConnector } from './connectors/ServiceDbConnector';

@Module({
  providers: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
    JobDbConnector,
    ServiceDbConnector
  ],
  exports: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
    JobDbConnector,
    ServiceDbConnector
  ],
})
export class InfraDbModule {}
