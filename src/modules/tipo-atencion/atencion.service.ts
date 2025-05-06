import { Injectable } from "@nestjs/common";
import { AtencionGrpcClient } from "./grpc/atencion.grpc-client";

@Injectable()
export class AtencionService {
    constructor(private readonly grpcClient: AtencionGrpcClient) {}

    async listAtenciones(page = 1, limit = 10) {
        return this.grpcClient.service.ListAtenciones({ page, limit }).toPromise();
    }
}