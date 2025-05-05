import { Injectable } from "@nestjs/common";
import { UsuariosGrpcClient } from "./grpc/usuarios.grpc-client";

@Injectable()
export class UsuariosService {
    constructor(private readonly grpcClient: UsuariosGrpcClient) {}

    async listUsuarios(page = 1, limit = 10) {
        return this.grpcClient.service.ListUsuarios({ page, limit }).toPromise();
    }
}