import { Injectable } from "@nestjs/common";
import { UersGrpcClient } from "./grpc/uers.grpc-client";

@Injectable()
export class UersService {
    constructor(private readonly grpcClient: UersGrpcClient) {}

    async listUers(page = 1, limit = 10) {
        return this.grpcClient.service.ListUERs({ page, limit }).toPromise();
    }
}