import { Injectable } from "@nestjs/common";
import { ContactoGrpcClient } from "./grpc/contacto.grpc-client";

@Injectable()
export class ContactoService {
    constructor(private readonly grpcClient: ContactoGrpcClient) {}

    async listContactos(page = 1, limit = 10) {
        return this.grpcClient.service.ListContactos({ page, limit }).toPromise();
    }
}