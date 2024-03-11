import { Module } from '@nestjs/common';
import { InfraDbModule } from 'src/infra/db/InfraDbModule';
import { NewsInsightQueryService } from './NewsInsigtQueryService';
import { BusinessLeadQueryService } from './BusinessLeadQueryService';

@Module({
  imports: [InfraDbModule],
  providers: [NewsInsightQueryService, BusinessLeadQueryService],
  exports: [NewsInsightQueryService, BusinessLeadQueryService],
})
export class QueryModule {}
