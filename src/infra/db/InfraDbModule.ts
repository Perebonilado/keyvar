import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { NewsInsightDbConnector } from './connectors/NewsInsightDbConnector';
import { BusinessEnquiryDbConnector } from './connectors/BusinessEnquiryDbConnector';
import { BusinessLeadDbConnector } from './connectors/BusinessLeadDbConnector';
import { JobDbConnector } from './connectors/JobDbConnector';
import { PricingPlanDbConnector } from './connectors/PricingPlanDbConnector';

@Module({
  providers: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
    JobDbConnector,
    PricingPlanDbConnector
  ],
  exports: [
    ...databaseProviders,
    NewsInsightDbConnector,
    BusinessEnquiryDbConnector,
    BusinessLeadDbConnector,
    JobDbConnector,
    PricingPlanDbConnector
  ],
})
export class InfraDbModule {}
