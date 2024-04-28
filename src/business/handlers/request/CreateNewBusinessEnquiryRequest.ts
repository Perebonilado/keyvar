import { BusinessEnquiryDto } from 'src/dto/BusinessEnquiryDto';
import CommandRequest from './CommandRequest';

export default interface CreateNewBusinessEnquiryRequest
  extends CommandRequest {
  payload: BusinessEnquiryDto;
}
