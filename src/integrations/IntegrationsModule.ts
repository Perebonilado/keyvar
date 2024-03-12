import { Module } from '@nestjs/common';
import { AwsModule } from './aws/AwsModule';

@Module({
  imports: [AwsModule],
  exports: [AwsModule],
})
export class IntegrationsModule {}
