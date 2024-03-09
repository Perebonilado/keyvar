import { Module } from '@nestjs/common';
import { InfraDbModule } from 'src/infra/db/InfraDbModule';

@Module({
  imports: [InfraDbModule],
  providers: [],
  exports: [],
})
export class QueryModule {}
