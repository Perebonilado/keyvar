import { CreateNewsInsightSubscriberDto } from 'src/dto/NewsInsightDto';
import CommandRequest from './CommandRequest';

export default interface CreateNewsInsightSubscriberRequest
  extends CommandRequest {
  subscriber: CreateNewsInsightSubscriberDto;
}
