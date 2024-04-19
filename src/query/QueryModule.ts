import { Module } from '@nestjs/common';
import { InfraDbModule } from 'src/infra/db/InfraDbModule';
import { NewsInsightQueryService } from './NewsInsigtQueryService';
import { BusinessLeadQueryService } from './BusinessLeadQueryService';
import { BusinessEnquiryQueryService } from './BusinessEnquiryQueryService';
import { JobQueryService } from './JobQueryService';
import { PricingPlanQueryService } from './PricingPlanQueryService';

@Module({
  imports: [InfraDbModule],
  providers: [
    NewsInsightQueryService,
    BusinessLeadQueryService,
    BusinessEnquiryQueryService,
    JobQueryService,
    PricingPlanQueryService,
  ],
  exports: [
    NewsInsightQueryService,
    BusinessLeadQueryService,
    BusinessEnquiryQueryService,
    JobQueryService,
    PricingPlanQueryService,
  ],
})
export class QueryModule {}
