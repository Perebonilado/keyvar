import { Module } from '@nestjs/common';
import { InfraDbModule } from 'src/infra/db/InfraDbModule';
import { NewsInsightQueryService } from './NewsInsigtQueryService';
import { BusinessLeadQueryService } from './BusinessLeadQueryService';
import { BusinessEnquiryQueryService } from './BusinessEnquiryQueryService';
import { JobQueryService } from './JobQueryService';
import { ServicesQueryService } from './ServicesQueryService';

@Module({
  imports: [InfraDbModule],
  providers: [
    NewsInsightQueryService,
    BusinessLeadQueryService,
    BusinessEnquiryQueryService,
    JobQueryService,
    ServicesQueryService
  ],
  exports: [
    NewsInsightQueryService,
    BusinessLeadQueryService,
    BusinessEnquiryQueryService,
    JobQueryService,
    ServicesQueryService 
  ],
})
export class QueryModule {}
