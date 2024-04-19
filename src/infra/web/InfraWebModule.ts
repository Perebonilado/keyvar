import { Module } from '@nestjs/common';
import { NewsInsightController } from './controllers/NewsInsightController';
import { BusinessModule } from 'src/business/BusinessModule';
import { QueryModule } from 'src/query/QueryModule';
import { InfraRepositoryModule } from '../db/InfraRepositoryModule';
import { BusinessEnquiryController } from './controllers/BusinessEnquiryController';
import { JobController } from './controllers/JobController';
import { IntegrationsModule } from 'src/integrations/IntegrationsModule';
import { PricingPlanController } from './controllers/PricingPlanController';

@Module({
  imports: [
    BusinessModule,
    QueryModule,
    InfraRepositoryModule,
    IntegrationsModule,
  ],
  controllers: [
    NewsInsightController,
    BusinessEnquiryController,
    JobController,
    PricingPlanController,
  ],
  providers: [],
})
export class InfraWebModule {}
