import { Module } from '@nestjs/common';
import { InfraDbModule } from './InfraDbModule';

@Module({
  imports: [InfraDbModule],
  providers: [],
  exports: [],
})
export class InfraRepositoryModule {}
