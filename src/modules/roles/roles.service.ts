import { Injectable } from "@nestjs/common";
import { RolesGrpcClient } from "./grpc/roles.grpc-clients";

@Injectable()
export class RolesService {
    constructor(private readonly grpcClient: RolesGrpcClient) {}

    async listRoles(page = 1, limit = 10) {
        return this.grpcClient.service.ListRoles({ page, limit }).toPromise();
    }
}