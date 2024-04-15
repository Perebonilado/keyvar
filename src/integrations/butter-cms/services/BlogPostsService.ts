import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnvironmentVariables } from 'src/EnvironmentVariables';
import { BlogPostQuery } from '../models/BlogPostsQuery.model';
import { HttpService } from '@nestjs/axios';
import { AllPostsDto } from '../dto/Posts.dto';
import { PostSummaryModel } from '../models/Posts.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class BlogPostsService {
  constructor(private readonly httpService: HttpService) {}

  private baseUrl = 'https://api.buttercms.com/v2';

  public async getAllBlogPosts({
    page = 1,
    pageSize = 10,
    category = '',
  }: BlogPostQuery): Promise<PostSummaryModel> {
    try {
      const url = `${this.baseUrl}/posts`;
      const { data: response } = await this.httpService.axiosRef.get<
        '',
        AxiosResponse<AllPostsDto, any>,
        any
      >(url, {
        params: {
          page_size: pageSize,
          page,
          category_slug: category,
          auth_token: EnvironmentVariables.config.butterCMSApiKey,
        },
      });

      return {
        data: response.data.map((res) => {
          return {
            author: {
              firstName: res.author.first_name,
              lastName: res.author.last_name,
            },
            category: res.categories.map((cat) => ({
              name: cat.name,
              id: cat.slug,
            })),
            date: res.published,
            image: res.featured_image,
            imageAlt: res.featured_image_alt,
            summary: res.summary,
            title: res.title,
            id: res.slug,
          };
        }),
        meta: {
          totalCount: response.meta.count,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong while retrieving posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
