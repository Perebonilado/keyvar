import { BusinessEnquiryDto } from 'src/dto/Enquiry';
import CommandRequest from './CommandRequest';

export default interface CreateNewBusinessEnquiryRequest
  extends CommandRequest {
  payload: BusinessEnquiryDto;
}
