import { Injectable } from "@nestjs/common";
import { ProyectosGrpcClient } from "./grpc/proyectos.grpc-client";

@Injectable()
export class ProyectosService {
  constructor(private readonly grpcClient: ProyectosGrpcClient) {}

  async listProyectos(page = 1, limit = 10) {
    return this.grpcClient.service.ListProyectos({ page, limit }).toPromise();
  }
}