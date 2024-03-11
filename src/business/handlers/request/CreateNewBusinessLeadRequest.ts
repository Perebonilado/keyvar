import { BusinessLeadDto } from 'src/dto/BusinessLead';
import CommandRequest from './CommandRequest';

export default interface CreateBusinessLeadRequest extends CommandRequest {
  payload: BusinessLeadDto;
}
