import { Injectable } from '@nestjs/common';
import { AgencyProjectsGrpcClient } from './grpc/agency-projects.grpc-client';

@Injectable()
export class AgencyProjectsService {
  constructor(private readonly grpcClient: AgencyProjectsGrpcClient) {}

  async listAgencyProjects(page = 1, perPage = 10) {
    return this.grpcClient.service.ListAgencyProjects({ page, perPage }).toPromise();
  }
}
