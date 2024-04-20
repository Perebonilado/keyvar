import { Module } from '@nestjs/common';
import { AwsModule } from './aws/AwsModule';
import { ButterCMSModule } from './butter-cms/ButterCMSModule';
import { MailerModule } from './mailer/MailerModule';

@Module({
  imports: [AwsModule, ButterCMSModule, MailerModule],
  exports: [AwsModule, ButterCMSModule, MailerModule],
})
export class IntegrationsModule {}
