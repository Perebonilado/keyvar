import { Module } from '@nestjs/common';
import { InfraDbModule } from './InfraDbModule';
import { NewsInsightSequalizeRepository } from './repository/NewsInsightSequalizeRepository';
import { NewsInsightRepository } from 'src/business/repository/NewsInsightRepository';
import { BusinessEnquiryRepository } from 'src/business/repository/BusinessEnquiryRepository';
import { BusinessEnquirySequalizeRepository } from './repository/BusinessEnquirySequalizeRepository';
import { BusinessLeadRepository } from 'src/business/repository/BusinessLeadRepository';
import { BusinessLeadSequalizeRepository } from './repository/BusinessLeadSequalizeRepository';
import { JobRepository } from 'src/business/repository/JobRepository';
import { JobSequalizeRepository } from './repository/JobSequalizeRepository';

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
    {
      provide: BusinessLeadRepository,
      useClass: BusinessLeadSequalizeRepository,
    },
    {
      provide: JobRepository,
      useClass: JobSequalizeRepository,
    },
  ],
  exports: [
    NewsInsightRepository,
    BusinessEnquiryRepository,
    BusinessLeadRepository,
    JobRepository
  ],
})
export class InfraRepositoryModule {}
