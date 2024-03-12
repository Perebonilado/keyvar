import { Module } from '@nestjs/common';
import { NewsInsightController } from './controllers/NewsInsightController';
import { BusinessModule } from 'src/business/BusinessModule';
import { QueryModule } from 'src/query/QueryModule';
import { InfraRepositoryModule } from '../db/InfraRepositoryModule';
import { BusinessEnquiryController } from './controllers/BusinessEnquiryController';
import { JobController } from './controllers/JobController';

@Module({
  imports: [BusinessModule, QueryModule, InfraRepositoryModule],
  controllers: [
    NewsInsightController,
    BusinessEnquiryController,
    JobController,
  ],
  providers: [],
})
export class InfraWebModule {}
