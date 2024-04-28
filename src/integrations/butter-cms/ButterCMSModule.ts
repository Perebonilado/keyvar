import { Module } from '@nestjs/common';
import { BlogPostsService } from './services/BlogPostsService';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BlogPostsService],
  exports: [BlogPostsService],
})
export class ButterCMSModule {}
