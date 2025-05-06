import { Injectable } from "@nestjs/common";
import { ClienteGrpcClient } from "./grpc/cliente.grpc-client";

@Injectable()
export class ClienteService {
    constructor(private readonly grpcClient: ClienteGrpcClient) {}

    async listClientes(page = 1, limit = 10) {
        return this.grpcClient.service.ListClientes({ page, limit }).toPromise();
    }
}
