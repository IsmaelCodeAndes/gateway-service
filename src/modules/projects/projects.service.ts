import { Injectable } from '@nestjs/common';
import { ProjectsGrpcClient } from './grpc/projects.grpc-client';

@Injectable()
export class ProjectsService {
  constructor(private readonly grpcClient: ProjectsGrpcClient) {}

  async listProjects(page = 1, limit = 10) {
    return this.grpcClient.service.ListProyectos({ page, limit }).toPromise();
  }
}
