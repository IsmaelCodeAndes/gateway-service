import { Module } from '@nestjs/common';
import { AgencyProjectsController } from './agency-projects.controller';
import { AgencyProjectsService } from './agency-projects.service';
import { AgencyProjectsGrpcClient } from './grpc/agency-projects.grpc-client';

@Module({
  controllers: [AgencyProjectsController],
  providers: [AgencyProjectsService, AgencyProjectsGrpcClient],
  exports: [AgencyProjectsService, AgencyProjectsGrpcClient],
})
export class AgencyProjectsModule {}
