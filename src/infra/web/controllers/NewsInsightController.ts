import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import CreateNewsInsightSubscriberHandler from 'src/business/handlers/NewsInsight/CreateNewsInsightSubscriberHandler';
import { CreateNewsInsightSubscriberDto } from 'src/dto/NewsInsight';
import { NewsInsightSubscriberWebModel } from '../models/NewsInsightSubscriber';
import { SuccessResponse } from '../models/SuccessReponse';
import { NewsInsightQueryService } from 'src/query/NewsInsigtQueryService';

@Controller('news-insight')
export class NewsInsightController {
  constructor(
    @Inject(CreateNewsInsightSubscriberHandler)
    private createNewsInsightSubscriberHandler: CreateNewsInsightSubscriberHandler,
    @Inject(NewsInsightQueryService)
    private newsInsightQueryService: NewsInsightQueryService,
  ) {}

  @Post('/subscribe')
  async subscribe(
    @Body() payload: CreateNewsInsightSubscriberDto,
  ): Promise<SuccessResponse<NewsInsightSubscriberWebModel>> {
    try {
      await this.createNewsInsightSubscriberHandler.handle({
        subscriber: payload,
      });

      const createdSubscriber =
        await this.newsInsightQueryService.findOneByEmail(payload.email);

      return {
        data: createdSubscriber.toDomain(),
        message: 'News Insight Subscriber successfully created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to save subscriber email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
