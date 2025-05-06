import { Module } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { ClienteController } from "./cliente.controller";
import { ClienteGrpcClient } from "./grpc/cliente.grpc-client";

@Module({
    controllers: [ClienteController],
    providers: [ClienteService, ClienteGrpcClient],
    exports: [ClienteService],
})
export class ClienteModule {}