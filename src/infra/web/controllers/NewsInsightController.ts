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
import { MailerService } from 'src/integrations/mailer/services/MailerService';
import { EnvironmentVariables } from 'src/EnvironmentVariables';
import { ManageMailChimpAudience } from 'src/integrations/mail-chimp/services/ManageMailChimpAudience';

@Controller('news-insight')
export class NewsInsightController {
  constructor(
    @Inject(CreateNewsInsightSubscriberHandler)
    private createNewsInsightSubscriberHandler: CreateNewsInsightSubscriberHandler,
    @Inject(NewsInsightQueryService)
    private newsInsightQueryService: NewsInsightQueryService,
    @Inject(BlogPostsService) private blogPostsService: BlogPostsService,
    @Inject(MailerService) private mailerService: MailerService,
    @Inject(ManageMailChimpAudience)
    private manageMailChimpAudience: ManageMailChimpAudience,
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

      await this.manageMailChimpAudience.addMemberToList({
        email: payload.email,
      });

      const createdSubscriber =
        await this.newsInsightQueryService.findOneByEmail(payload.email);

      await this.mailerService.sendEmail({
        receiverEmail: payload.email,
        subject: 'News Letter Subscription Successful',
        text: 'You have successfully subscribed for Keyvar News Letters',
      });

      await this.mailerService.sendEmail({
        receiverEmail: EnvironmentVariables.config.emailUser,
        subject: 'You have a new subscriber!',
        text: `${payload.email} just subscribed to your news letter service!`,
      });

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
  public async getCategories(): Promise<PostCategoryModel[]> {
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
