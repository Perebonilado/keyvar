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
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateJobApplicationHandler } from 'src/business/handlers/Job/CreateJobApplicationHandler';
import { JobApplicationDto } from 'src/dto/JobApplicationDto';
import { SuccessResponse } from '../models/SuccessReponse';
import { JobQueryService } from 'src/query/JobQueryService';
import { JobRoleModel } from 'src/infra/db/models/JobRoleModel';
import { JobRoleDto } from 'src/dto/JobRoleDto';
import { CreateJobRoleHandler } from 'src/business/handlers/Job/CreateJobRoleHandler';
import { CreateJobRoleValidationSchema } from '../zod-validation-schemas/JobValidationSchema';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.pipe';
import { MailerService } from 'src/integrations/mailer/services/MailerService';
import { EnvironmentVariables } from 'src/EnvironmentVariables';

@Controller('job')
export class JobController {
  constructor(
    @Inject(CreateJobApplicationHandler)
    private createJobApplicationHandler: CreateJobApplicationHandler,
    @Inject(JobQueryService) private jobQueryService: JobQueryService,
    @Inject(CreateJobRoleHandler)
    private createJobRoleHandler: CreateJobRoleHandler,
    @Inject(MailerService) private mailerService: MailerService,
  ) {}

  @Post('/apply')
  @UseInterceptors(FileInterceptor('resume'))
  async saveJobApplication(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: JobApplicationDto,
  ): Promise<SuccessResponse<null>> {
    try {
      // await this.createJobApplicationHandler.handle({
      //   payload: {
      //     email: body.email,
      //     experience: body.experience,
      //     firstName: body.firstName,
      //     lastName: body.lastName,
      //     isWorkAuthorization: body.isWorkAuthorization,
      //     roleId: body.roleId,
      //     phone: body.phone ?? null,
      //     resume: file,
      //   },
      // });
      await this.mailerService.sendEmail({
        receiverEmail: EnvironmentVariables.config.emailUser,
        subject: `Job Application for ${body.roleId}`,
        text: `
        Information -
        Email: ${body.email},
        First Name: ${body.firstName},
        Last Name: ${body.lastName},
        Work Authorization: ${body.isWorkAuthorization ? "Yes" : "No"},
        Role: ${body.roleId},
        Phone: ${body.phone}
        `,
        attachments: [file],
      });

      await this.mailerService.sendEmail({
        receiverEmail: body.email,
        subject: "Job application received",
        text: `Your application for the role of ${body.roleId} has been received and you should hear back shortly.`
      })

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
  public async getJobRoles(): Promise<JobRoleModel[]> {
    try {
      return await this.jobQueryService.findAllActiveJobRoles();
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to get job roles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/create-role')
  @UsePipes(new ZodValidationPipe(CreateJobRoleValidationSchema))
  public async createJobRole(@Body() role: JobRoleDto): Promise<JobRoleModel> {
    try {
      const createdJobRole = await this.createJobRoleHandler.handle({
        payload: role,
      });

      return await this.jobQueryService.findJobRoleByTitle(
        createdJobRole.jobRole.title,
      );
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to create new role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
