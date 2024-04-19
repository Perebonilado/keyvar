import { Injectable } from '@nestjs/common';
import { DatabaseError } from 'src/error-handlers/infra/DatabaseError';
import { ServiceModel } from '../models/ServiceModel';

@Injectable()
export class ServiceDbConnector {
  constructor() {}

  public async create(service: ServiceModel) {
    try {
      return await ServiceModel.create(service);
    } catch (error) {
      throw new DatabaseError('Failed to save service').InnerError(error);
    }
  }

  public async findByTitle(title: string) {
    try {
      return await ServiceModel.findOne({ where: { title } });
    } catch (error) {
      throw new DatabaseError(
        `Failed to find service by title: ${title}`,
      ).InnerError(error);
    }
  }
}
