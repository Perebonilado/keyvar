import { NewsInsightSubscriber } from 'src/business/models/NewsInsightSubscriber';
import { BusinessEvent } from '../BusinessEvent';
import { BusinessEventType } from '../BusinessEventType';

export class NewsInsightSubscriberCreated extends BusinessEvent {
  readonly newsInsightSubscriber: NewsInsightSubscriber;

  constructor(newsInsightSubscriber: NewsInsightSubscriber) {
    super(BusinessEventType.NEWS_INSIGHT_SUBSCRIBER_CREATED);
    this.newsInsightSubscriber = newsInsightSubscriber;
  }
}
