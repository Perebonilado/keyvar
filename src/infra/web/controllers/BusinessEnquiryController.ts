import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { BusinessEnquiryDto } from 'src/dto/BusinessEnquiryDto';
import { SuccessResponse } from '../models/SuccessReponse';
import { BusinessEnquiryWebModel } from '../models/BusinessEnquiry';
import { CreateBusinessEnquiryHandler } from 'src/business/handlers/BusinessEnquiry/CreateBusinessEnquiryHandler';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.pipe';
import { SubmitBusinessEnquirySchema } from '../zod-validation-schemas/BusinessEnquiryValidationSchema';
import { MailerService } from 'src/integrations/mailer/services/MailerService';
import { EnvironmentVariables } from 'src/EnvironmentVariables';

@Controller('enquiry')
export class BusinessEnquiryController {
  constructor(
    @Inject(CreateBusinessEnquiryHandler)
    private createBusinessEnquiryHandler: CreateBusinessEnquiryHandler,
    @Inject(MailerService) private mailerService: MailerService,
  ) {}

  @Post('/make-enquiry')
  @UsePipes(new ZodValidationPipe(SubmitBusinessEnquirySchema))
  async submitBusinessEnquiry(
    @Body() payload: BusinessEnquiryDto,
  ): Promise<SuccessResponse<BusinessEnquiryWebModel>> {
    try {
      await this.createBusinessEnquiryHandler.handle({ payload });
      await this.mailerService.sendEmail({
        receiverEmail: EnvironmentVariables.config.emailUser,
        subject: `New Enquiry from ${payload.lastName ?? ''} ${payload.firstName ?? ''}`,
        text: `Message: ${payload.enquiry}`,
      });
      await this.mailerService.sendEmail({
        receiverEmail: payload.email,
        subject: 'Enquiry Received',
        text: 'Your business enquiry has successfully been received',
      });

      return {
        data: {} as BusinessEnquiryWebModel,
        message: 'Business enquiry successfully created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to submit business enquiry',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
