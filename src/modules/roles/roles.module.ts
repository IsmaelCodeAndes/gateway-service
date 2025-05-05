import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { RolesGrpcClient } from "./grpc/roles.grpc-clients";

@Module({
    controllers: [RolesController],
    providers: [RolesService, RolesGrpcClient],
    exports: [RolesService, RolesGrpcClient]
})
export class RolesModule {}
