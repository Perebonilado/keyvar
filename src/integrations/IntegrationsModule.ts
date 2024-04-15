import { Module } from '@nestjs/common';
import { AwsModule } from './aws/AwsModule';
import { ButterCMSModule } from './butter-cms/ButterCMSModule';

@Module({
  imports: [AwsModule, ButterCMSModule],
  exports: [AwsModule, ButterCMSModule],
})
export class IntegrationsModule {}
