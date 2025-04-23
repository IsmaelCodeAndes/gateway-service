import { Module } from '@nestjs/common';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { AgenciesGrpcClient } from './grpc/agencies.grpc-client';

@Module({
  controllers: [AgenciesController],
  providers: [AgenciesService, AgenciesGrpcClient],
  exports: [AgenciesService, AgenciesGrpcClient],
})
export class AgenciesModule {}
