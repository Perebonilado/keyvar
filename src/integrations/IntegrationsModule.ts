import { Module } from '@nestjs/common';
import { AwsModule } from './aws/AwsModule';
import { ButterCMSModule } from './butter-cms/ButterCMSModule';
import { MailerModule } from './mailer/MailerModule';
import { MailChimpModule } from './mail-chimp/MailChimpModule';

@Module({
  imports: [AwsModule, ButterCMSModule, MailerModule, MailChimpModule],
  exports: [AwsModule, ButterCMSModule, MailerModule, MailChimpModule],
})
export class IntegrationsModule {}
