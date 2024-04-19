import { ServiceDto } from 'src/dto/ServiceDto';
import CommandRequest from './CommandRequest';

export default interface CreateServiceRequest extends CommandRequest {
  service: ServiceDto;
}
