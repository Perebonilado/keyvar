import { Injectable } from '@nestjs/common';
import QueryError from 'src/error-handlers/query/QueryError';
import { ServiceModel } from 'src/infra/db/models/ServiceModel';

@Injectable()
export class ServicesQueryService {
  public async findServiceByTitle(title: string) {
    try {
      return await ServiceModel.findOne({ where: { title } });
    } catch (error) {
      throw new QueryError(
        `Failed to find service by title: ${title}`,
      ).InnerError(error);
    }
  }

  public async findAllActiveServices() {
    try {
      return await ServiceModel.findAll({ where: { isActive: true } });
    } catch (error) {
      throw new QueryError(`Failed to find services`).InnerError(error);
    }
  }
}
