import { JobRoleDto } from 'src/dto/JobRoleDto';
import CommandRequest from './CommandRequest';

export default interface CreateJobRoleRequest extends CommandRequest {
  payload: JobRoleDto;
}
