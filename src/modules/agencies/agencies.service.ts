import { Injectable } from '@nestjs/common';
import { AgenciesGrpcClient } from './grpc/agencies.grpc-client';

@Injectable()
export class AgenciesService {
  constructor(private readonly grpcClient: AgenciesGrpcClient) {}

  async listAgencies(page = 1, limit = 10) {
    return this.grpcClient.service.ListAgencias({ page, limit }).toPromise();
  }
}
