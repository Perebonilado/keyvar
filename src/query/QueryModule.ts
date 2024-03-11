import { Module } from '@nestjs/common';
import { InfraDbModule } from 'src/infra/db/InfraDbModule';
import { NewsInsightQueryService } from './NewsInsigtQueryService';
import { BusinessLeadQueryService } from './BusinessLeadQueryService';
import { BusinessEnquiryQueryService } from './BusinessEnquiryQueryService';

@Module({
  imports: [InfraDbModule],
  providers: [
    NewsInsightQueryService,
    BusinessLeadQueryService,
    BusinessEnquiryQueryService,
  ],
  exports: [
    NewsInsightQueryService,
    BusinessLeadQueryService,
    BusinessEnquiryQueryService,
  ],
})
export class QueryModule {}
