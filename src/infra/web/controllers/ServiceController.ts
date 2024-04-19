import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import CreateServiceHandler from 'src/business/handlers/Service/CreateServiceHandler';
import { ServiceDto } from 'src/dto/ServiceDto';
import { ServicesQueryService } from 'src/query/ServicesQueryService';
import { CreateServiceValidationSchema } from '../zod-validation-schemas/ServiceValidationSchema';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.pipe';

@Controller('service')
export class ServiceController {
  constructor(
    @Inject(CreateServiceHandler)
    private createServiceHandler: CreateServiceHandler,
    @Inject(ServicesQueryService)
    private servicesQueryService: ServicesQueryService,
  ) {}

  @Post('/create-service')
  @UsePipes(new ZodValidationPipe(CreateServiceValidationSchema))
  public async createService(@Body() body: ServiceDto) {
    try {
      const createdService = await this.createServiceHandler.handle({
        service: body,
      });

      return await this.servicesQueryService.findServiceByTitle(
        createdService.service.title,
      );
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to create service',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('')
  public async retrieveAllActiveServices() {
    try {
      return await this.servicesQueryService.findAllActiveServices();
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to find services',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
