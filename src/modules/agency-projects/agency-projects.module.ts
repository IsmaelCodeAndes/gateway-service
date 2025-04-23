import { Module } from '@nestjs/common';
import { AgencyProjectsController } from './agency-projects.controller';
import { AgencyProjectsService } from './agency-projects.service';
import { AgencyProjectsGrpcClient } from './grpc/agency-projects.grpc-client';
import { AgenciesModule } from '../agencies/agencies.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [AgenciesModule, ProjectsModule],
  controllers: [AgencyProjectsController],
  providers: [AgencyProjectsService, AgencyProjectsGrpcClient],
  exports: [AgencyProjectsService, AgencyProjectsGrpcClient],
})
export class AgencyProjectsModule {}
