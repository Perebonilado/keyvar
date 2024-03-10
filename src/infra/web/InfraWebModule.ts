import { Module } from '@nestjs/common';
import { NewsLetterController } from './controllers/NewsLetterController';

@Module({
  imports: [],
  controllers: [NewsLetterController],
  providers: [],
})
export class InfraWebModule {}
