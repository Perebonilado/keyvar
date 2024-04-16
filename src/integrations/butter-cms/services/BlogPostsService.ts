import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnvironmentVariables } from 'src/EnvironmentVariables';
import { BlogPostQuery } from '../models/BlogPostsQuery.model';
import { HttpService } from '@nestjs/axios';
import { AllPostsDto, PostCategoryDto, PostDto } from '../dto/Posts.dto';
import {
  PostCategoryModel,
  PostModel,
  PostSummaryModel,
} from '../models/Posts.model';
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
          exclude_body: true,
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
          nextPage: response.meta.next_page 
        },
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong while retrieving posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getBlogPost(id: string): Promise<PostModel> {
    try {
      const url = `${this.baseUrl}/posts/${id}`;
      const {
        data: { data: response },
      } = await this.httpService.axiosRef.get<
        '',
        AxiosResponse<{ data: PostDto }, any>,
        any
      >(url, {
        params: {
          auth_token: EnvironmentVariables.config.butterCMSApiKey,
        },
      });

      return {
        id: response.slug,
        author: {
          firstName: response.author.first_name,
          lastName: response.author.last_name,
          image: response.author.profile_image,
        },
        body: response.body,
        title: response.title,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve blog post with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getPostCategories(): Promise<PostCategoryModel[]> {
    try {
      const url = `${this.baseUrl}/categories`;
      const { data: response } = await this.httpService.axiosRef.get<
        '',
        AxiosResponse<{ data: PostCategoryDto[] }, any>,
        any
      >(url, {
        params: {
          auth_token: EnvironmentVariables.config.butterCMSApiKey,
        },
      });
      return response.data.map((res) => ({ name: res.name, id: res.slug }));
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve categories`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
