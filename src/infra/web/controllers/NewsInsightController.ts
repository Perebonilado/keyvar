import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import CreateNewsInsightSubscriberHandler from 'src/business/handlers/NewsInsight/CreateNewsInsightSubscriber';
import { CreateNewsInsightSubscriberDto } from 'src/dto/NewsInsight';

@Controller('news-insight')
export class NewsInsightController {
  constructor(
    @Inject(CreateNewsInsightSubscriberHandler)
    private createNewsInsightSubscriberHandler: CreateNewsInsightSubscriberHandler,
  ) {}

  @Post('/subscribe')
  async subscribe(@Body() payload: CreateNewsInsightSubscriberDto) {
    try {
      return await this.createNewsInsightSubscriberHandler.handle({
        subscriber: payload,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to create news letter subscriber',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
