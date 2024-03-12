import { JobApplicationDto } from 'src/dto/JobApplicationDto';
import CommandRequest from './CommandRequest';

export default interface CreateJobApplicationRequest extends CommandRequest {
  payload: JobApplicationDto;
}
