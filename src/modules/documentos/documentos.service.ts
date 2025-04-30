import { Injectable } from "@nestjs/common";
import { DocumentosGrpcClient } from "./grpc/documentos.grpc-client";

@Injectable()
export class DocumentosService {
    constructor(private readonly grpcClient: DocumentosGrpcClient) {}

    async listDocumentos(page = 1, limit = 10) {
        return this.grpcClient.service.ListDocumentos({ page, limit }).toPromise();
    }
}