import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateJobApplicationHandler } from 'src/business/handlers/Job/CreateJobApplicationHandler';
import { JobApplicationDto } from 'src/dto/JobApplicationDto';
import { SuccessResponse } from '../models/SuccessReponse';
import { JobQueryService } from 'src/query/JobQueryService';
import { JobRoleModel } from 'src/infra/db/models/JobRoleModel';

@Controller('job')
export class JobController {
  constructor(
    @Inject(CreateJobApplicationHandler)
    private createJobApplicationHandler: CreateJobApplicationHandler,
    @Inject(JobQueryService) private jobQueryService: JobQueryService,
  ) {}

  @Post('/apply')
  @UseInterceptors(FileInterceptor('resume'))
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
        error?._innerError ??
          'Something went wrong while saving your application',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/roles')
  public async getJobRoles():Promise<JobRoleModel[]> {
    try {
      return await this.jobQueryService.findAllActiveJobRoles();
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to get job roles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
