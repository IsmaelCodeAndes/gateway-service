import { Module } from "@nestjs/common";
import { OpcionesController } from "./opciones.controller";
import { OpcionesService } from "./opciones.service";
import { OpcionesGrpcClient } from "./grpc/opciones.grpc-client";

@Module({
    controllers: [OpcionesController],
    providers: [OpcionesService, OpcionesGrpcClient],
    exports: [OpcionesService, OpcionesGrpcClient]
})
export class OpcionesModule {}