import { JobApplicantDto } from 'src/dto/JobApplicantDto';
import CommandRequest from './CommandRequest';

export default interface CreateJobApplicantRequest extends CommandRequest {
  payload: JobApplicantDto;
}
