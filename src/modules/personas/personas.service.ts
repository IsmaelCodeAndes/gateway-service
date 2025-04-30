import { Injectable } from "@nestjs/common";
import { PersonasGrpcClient } from "./grpc/personas.grpc-client";

@Injectable()
export class PersonasService {
    constructor(private readonly personasGrpcClient: PersonasGrpcClient) {}

    async listPersonas(page = 1, limit = 10) {
        return this.personasGrpcClient.service.ListPersonas({ page, limit }).toPromise();
    }
}