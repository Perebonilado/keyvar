import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { BusinessEnquiryDto } from 'src/dto/BusinessEnquiryDto';
import { SuccessResponse } from '../models/SuccessReponse';
import { BusinessEnquiryWebModel } from '../models/BusinessEnquiry';
import { CreateBusinessEnquiryHandler } from 'src/business/handlers/BusinessEnquiry/CreateBusinessEnquiryHandler';
import { BusinessEnquiryQueryService } from 'src/query/BusinessEnquiryQueryService';

@Controller('enquiry')
export class BusinessEnquiryController {
  constructor(
    @Inject(CreateBusinessEnquiryHandler)
    private createBusinessEnquiryHandler: CreateBusinessEnquiryHandler,
    @Inject(BusinessEnquiryQueryService)
    private businessEnquiryQueryService: BusinessEnquiryQueryService,
  ) {}

  @Post('/make-enquiry')
  async submitBusinessEnquiry(
    @Body() payload: BusinessEnquiryDto,
  ): Promise<SuccessResponse<BusinessEnquiryWebModel>> {
    try {
      await this.createBusinessEnquiryHandler.handle({ payload });

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
