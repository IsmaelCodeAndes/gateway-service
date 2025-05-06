import { Module } from "@nestjs/common";
import { AtencionService } from "./atencion.service";
import { AtencionController } from "./atencion.controller";
import { AtencionGrpcClient } from "./grpc/atencion.grpc-client";

@Module({
    controllers: [AtencionController],
    providers: [AtencionService, AtencionGrpcClient],
    exports: [AtencionService],
})
export class AtencionModule {}