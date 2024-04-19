import { Inject } from '@nestjs/common';
import { ServiceRepository } from 'src/business/repository/ServiceRepository';
import { ServiceDbConnector } from '../connectors/ServiceDbConnector';
import { Service } from 'src/business/models/Service';
import { ServiceModel } from '../models/ServiceModel';
import RepositoryError from 'src/error-handlers/infra/RepositoryError';

export class ServiceSequalizeRepository implements ServiceRepository {
  constructor(
    @Inject(ServiceDbConnector) private serviceDbConnector: ServiceDbConnector,
  ) {}

  public async create(service: Service): Promise<ServiceModel> {
    try {
      return await this.serviceDbConnector.create({
        title: service.title,
        description: service.description,
        targetAudience: service.targetAudience,
        price: service.price,
        isActive: service.isActive,
      } as ServiceModel);
    } catch (error) {
      throw new RepositoryError('Failed to create service').InnerError(error);
    }
  }
}
