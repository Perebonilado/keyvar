import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

@Controller('job')
export class JobController {
  constructor() {}

  @Post('')
  async saveJobApplication() {}
}
