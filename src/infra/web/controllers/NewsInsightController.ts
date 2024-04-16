import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import CreateNewsInsightSubscriberHandler from 'src/business/handlers/NewsInsight/CreateNewsInsightSubscriberHandler';
import { CreateNewsInsightSubscriberDto } from 'src/dto/NewsInsightDto';
import { NewsInsightSubscriberWebModel } from '../models/NewsInsightSubscriber';
import { SuccessResponse } from '../models/SuccessReponse';
import { NewsInsightQueryService } from 'src/query/NewsInsigtQueryService';
import { SubscribeInsightValidationSchema } from '../zod-validation-schemas/NewsInsightValidationSchema';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe.pipe';
import { BlogPostsService } from 'src/integrations/butter-cms/services/BlogPostsService';
import { BlogPostQuery } from 'src/integrations/butter-cms/models/BlogPostsQuery.model';
import {
  PostCategoryModel,
  PostModel,
  PostSummaryModel,
} from 'src/integrations/butter-cms/models/Posts.model';

@Controller('news-insight')
export class NewsInsightController {
  constructor(
    @Inject(CreateNewsInsightSubscriberHandler)
    private createNewsInsightSubscriberHandler: CreateNewsInsightSubscriberHandler,
    @Inject(NewsInsightQueryService)
    private newsInsightQueryService: NewsInsightQueryService,
    @Inject(BlogPostsService) private blogPostsService: BlogPostsService,
  ) {}

  @Post('/subscribe')
  @UsePipes(new ZodValidationPipe(SubscribeInsightValidationSchema))
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

  @Get('/posts')
  public async getBlogPosts(
    @Query() query: BlogPostQuery,
  ): Promise<PostSummaryModel> {
    try {
      return await this.blogPostsService.getAllBlogPosts(query);
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? 'Failed to get blog posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/posts/:id')
  public async getPost(@Param() params: { id: string }): Promise<PostModel> {
    try {
      return await this.blogPostsService.getBlogPost(params.id);
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? `Failed to get post with id ${params.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/categories')
  public async getCategories():Promise<PostCategoryModel[]> {
    try {
      return await this.blogPostsService.getPostCategories();
    } catch (error) {
      throw new HttpException(
        error?._innerError ?? `Failed to get categories`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
