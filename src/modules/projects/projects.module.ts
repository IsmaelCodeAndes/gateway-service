import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsGrpcClient } from './grpc/projects.grpc-client';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsGrpcClient],
  exports: [ProjectsService, ProjectsGrpcClient],
})
export class ProjectsModule {}
