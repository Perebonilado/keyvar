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
import { NewsInsightSubscriber } from '../models/NewsInsightSubscriber';
import { SuccessResponse } from '../models/SuccessReponse';

@Controller('news-insight')
export class NewsInsightController {
  constructor(
    @Inject(CreateNewsInsightSubscriberHandler)
    private createNewsInsightSubscriberHandler: CreateNewsInsightSubscriberHandler,
  ) {}

  @Post('/subscribe')
  async subscribe(
    @Body() payload: CreateNewsInsightSubscriberDto,
  ): Promise<SuccessResponse> {
    try {
      const { newsInsightSubscriber } =
        await this.createNewsInsightSubscriberHandler.handle({
          subscriber: payload,
        });

      return {
        data: { email: newsInsightSubscriber.email },
        message: 'News Insight Subscriber successfully created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? "Failed to save subscriber email",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
