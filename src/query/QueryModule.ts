import { Module } from '@nestjs/common';
import { InfraDbModule } from 'src/infra/db/InfraDbModule';
import { NewsInsightQueryService } from './NewsInsigtQueryService';

@Module({
  imports: [InfraDbModule],
  providers: [NewsInsightQueryService],
  exports: [NewsInsightQueryService],
})
export class QueryModule {}
