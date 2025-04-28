import { Injectable } from "@nestjs/common";
import { EmpresasGrpcClient } from "./grpc/empresas.grpc-client";

@Injectable()
export class EmpresasService {
  constructor(private readonly grpcClient: EmpresasGrpcClient) {}

  async listEmpresas(page = 1, limit = 10) {
    return this.grpcClient.service.ListEmpresas({ page, limit }).toPromise();
  }
}