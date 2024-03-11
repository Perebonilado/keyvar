import { Module } from '@nestjs/common';
import { InfraDbModule } from './InfraDbModule';
import { NewsInsightSequalizeRepository } from './repository/NewsInsightSequalizeRepository';
import { NewsInsightRepository } from 'src/business/repository/NewsInsightRepository';
import { BusinessEnquiryRepository } from 'src/business/repository/BusinessEnquiryRepository';
import { BusinessEnquirySequalizeRepository } from './repository/BusinessEnquirySequalizeRepository';
import { BusinessLeadRepository } from 'src/business/repository/BusinessLeadRepository';
import { BusinessLeadSequalizeRepository } from './repository/BusinessLeadSequalizeRepository';

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
  ],
  exports: [
    NewsInsightRepository,
    BusinessEnquiryRepository,
    BusinessLeadRepository,
  ],
})
export class InfraRepositoryModule {}
