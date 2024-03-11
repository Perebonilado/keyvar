import { CreateNewsInsightSubscriberDto } from 'src/dto/NewsInsight';
import CommandRequest from './CommandRequest';

export default interface CreateNewsInsightSubscriberRequest
  extends CommandRequest {
  subscriber: CreateNewsInsightSubscriberDto;
}
