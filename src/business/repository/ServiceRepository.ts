import { ServiceModel } from "src/infra/db/models/ServiceModel";
import { Service } from "../models/Service";


export const ServiceRepository = Symbol('ServiceRepository');
export interface ServiceRepository {
    create(service: Service): Promise<ServiceModel>
}