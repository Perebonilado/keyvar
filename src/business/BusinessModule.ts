import { Module } from '@nestjs/common';
import { InfraRepositoryModule } from 'src/infra/db/InfraRepositoryModule';
import { QueryModule } from 'src/query/QueryModule';

@Module({
  imports: [QueryModule, InfraRepositoryModule],
  providers: [],
  exports: [],
})
export class BusinessModule {}
