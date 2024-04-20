import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService as NodeMailerService } from '@nestjs-modules/mailer';
import { SendEmailModel } from '../models/SendEmailModel';

@Injectable()
export class MailerService {
  constructor(private mailingService: NodeMailerService) {}

  public async sendEmail(payload: SendEmailModel) {
    try {
      await this.mailingService.sendMail({
        subject: payload.subject,
        to: payload.receiverEmail,
        text: payload.text,
      });
    } catch (error) {
      throw new HttpException('Failed to send email', HttpStatus.BAD_REQUEST);
    }
  }
}
