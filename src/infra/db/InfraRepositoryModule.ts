import { Module } from '@nestjs/common';
import { InfraDbModule } from './InfraDbModule';
import { NewsInsightSequalizeRepository } from './repository/NewsInsightSequalizeRepository';
import { NewsInsightRepository } from 'src/business/repository/NewsInsightRepository';
import { BusinessEnquiryRepository } from 'src/business/repository/BusinessEnquiryRepository';
import { BusinessEnquirySequalizeRepository } from './repository/BusinessEnquirySequalizeRepository';

@Module({
  imports: [InfraDbModule],
  providers: [
    {
      provide: NewsInsightRepository,
      useClass: NewsInsightSequalizeRepository,
    },
    {
      provide: BusinessEnquiryRepository,
      useClass: BusinessEnquirySequalizeRepository,
    },
  ],
  exports: [NewsInsightRepository],
})
export class InfraRepositoryModule {}
