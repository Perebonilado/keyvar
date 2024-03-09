import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraWebModule } from './infra/web/InfraWebModule';
import { InfraDbModule } from './infra/db/InfraDbModule';
import { InfraRepositoryModule } from './infra/db/InfraRepositoryModule';
import { QueryModule } from './query/QueryModule';
import { BusinessModule } from './business/BusinessModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraWebModule,
    InfraDbModule,
    InfraRepositoryModule,
    QueryModule,
    BusinessModule,
  ],
  providers: [],
})
export class AppModule {}
