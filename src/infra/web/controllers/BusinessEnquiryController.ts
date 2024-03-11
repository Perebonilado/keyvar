import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { BusinessEnquiryDto } from 'src/dto/Enquiry';
import { SuccessResponse } from '../models/SuccessReponse';
import { BusinessEnquiryWebModel } from '../models/BusinessEnquiry';

@Controller('enquiry')
export class BusinessEnquiryController {
  constructor() {}

  @Post()
  async submitBusinessEnquiry(
    @Body() payload: BusinessEnquiryDto,
  ): Promise<SuccessResponse<BusinessEnquiryWebModel>> {
    try {
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to submit business enquiry',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
