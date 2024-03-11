import { BusinessLeadDto } from 'src/dto/BusinessLeadDto';
import CommandRequest from './CommandRequest';

export default interface CreateBusinessLeadRequest extends CommandRequest {
  payload: BusinessLeadDto;
}
