import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateJobApplicationHandler } from 'src/business/handlers/Job/CreateJobApplicationHandler';
import { JobApplicationDto } from 'src/dto/JobApplicationDto';
import { SuccessResponse } from '../models/SuccessReponse';
import { SaveJobApplication } from '../zod-validation-schemas/JobValidationSchema';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.pipe';

@Controller('job')
export class JobController {
  constructor(
    @Inject(CreateJobApplicationHandler)
    private createJobApplicationHandler: CreateJobApplicationHandler,
  ) {}

  @Post('/apply')
  @UseInterceptors(FileInterceptor('resume'))
  @UsePipes(new ZodValidationPipe(SaveJobApplication))
  async saveJobApplication(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: JobApplicationDto,
  ): Promise<SuccessResponse<null>> {
    try {
      await this.createJobApplicationHandler.handle({
        payload: {
          email: body.email,
          experience: body.experience,
          firstName: body.firstName,
          lastName: body.lastName,
          isWorkAuthorization: body.isWorkAuthorization,
          roleId: body.roleId,
          phone: body.phone ?? null,
          resume: file,
        },
      });

      return {
        data: null,
        message: 'Job Application submitted successfully',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Something went wrong while saving your application',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
