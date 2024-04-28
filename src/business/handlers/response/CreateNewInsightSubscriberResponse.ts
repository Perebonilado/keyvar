import { NewsInsightSubscriber } from 'src/business/models/NewsInsightSubscriber';
import CommandResponse from './CommandResponse';

export default class CreateNewsInsightSubscriberResponse extends CommandResponse {
  readonly newsInsightSubscriber: NewsInsightSubscriber;

  constructor(newsInsightSubscriber: NewsInsightSubscriber) {
    super(newsInsightSubscriber.events);
    this.newsInsightSubscriber = newsInsightSubscriber;
  }
}
