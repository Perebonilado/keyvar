import { Module } from '@nestjs/common';
import { InfraRepositoryModule } from 'src/infra/db/InfraRepositoryModule';
import { QueryModule } from 'src/query/QueryModule';
import CreateNewsInsightSubscriberHandler from './handlers/NewsInsight/CreateNewsInsightSubscriberHandler';
import KeyvarEventEmitter from './events/KeyvarEventEmitter';
import { CreateBusinessLeadHandler } from './handlers/BusinessLead/CreateBusinessLeadHandler';
import { CreateBusinessEnquiryHandler } from './handlers/BusinessEnquiry/CreateBusinessEnquiryHandler';
import { IntegrationsModule } from 'src/integrations/IntegrationsModule';
import { CreateJobApplicantHandler } from './handlers/Job/CreateJobApplicantHandler';
import { CreateJobApplicationHandler } from './handlers/Job/CreateJobApplicationHandler';
import { CreateJobRoleHandler } from './handlers/Job/CreateJobRoleHandler';
import { CreatePricingPlanHandler } from './handlers/PricingPlans/CreatePricingPlanHandler';

@Module({
  imports: [QueryModule, InfraRepositoryModule, IntegrationsModule],
  providers: [
    KeyvarEventEmitter,
    CreateNewsInsightSubscriberHandler,
    CreateBusinessLeadHandler,
    CreateBusinessEnquiryHandler,
    CreateJobApplicantHandler,
    CreateJobApplicationHandler,
    CreateJobRoleHandler,
    CreatePricingPlanHandler,
  ],
  exports: [
    KeyvarEventEmitter,
    CreateNewsInsightSubscriberHandler,
    CreateBusinessLeadHandler,
    CreateBusinessEnquiryHandler,
    CreateJobApplicantHandler,
    CreateJobApplicationHandler,
    CreateJobRoleHandler,
    CreatePricingPlanHandler,
  ],
})
export class BusinessModule {}
