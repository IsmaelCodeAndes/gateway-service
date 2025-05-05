import { Injectable } from "@nestjs/common";
import { OpcionesGrpcClient } from "./grpc/opciones.grpc-client";

@Injectable()
export class OpcionesService {
    constructor(private readonly grpcClient: OpcionesGrpcClient) {}

    async listOpciones(page = 1, limit = 10) {
        return this.grpcClient.service.ListOpciones({ page, limit }).toPromise();
    }
}
