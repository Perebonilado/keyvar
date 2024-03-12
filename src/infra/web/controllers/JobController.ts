import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplicantDto } from 'src/dto/JobApplicantDto';

@Controller('job')
export class JobController {
  constructor(
  ) {}

  @Post('/apply')
  @UseInterceptors(FileInterceptor('resume'))
  async saveJobApplication(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: JobApplicantDto,
  ) {
    try {
      
    } catch (error) {
      throw new HttpException(
        'Something went wrong while saving your resume',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
