import { Module } from '@nestjs/common';
import { NewsInsightController } from './controllers/NewsInsightController';
import { BusinessModule } from 'src/business/BusinessModule';
import { QueryModule } from 'src/query/QueryModule';
import { InfraRepositoryModule } from '../db/InfraRepositoryModule';

@Module({
  imports: [BusinessModule, QueryModule, InfraRepositoryModule],
  controllers: [NewsInsightController],
  providers: [],
})
export class InfraWebModule {}
