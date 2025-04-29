import { Module } from "@nestjs/common";
import { ProyectosService } from "./proyectos.service";
import { ProyectosController } from "./proyectos.controller";
import { ProyectosGrpcClient } from "./grpc/proyectos.grpc-client";

@Module({
  controllers: [ProyectosController],
  providers: [ProyectosService, ProyectosGrpcClient],
  exports: [ProyectosService, ProyectosGrpcClient],
})
export class ProyectosInmobiliariosModule {}