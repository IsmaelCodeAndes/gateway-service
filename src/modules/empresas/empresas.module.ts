import { Module } from "@nestjs/common";
import { EmpresasController } from "./empresas.controller";
import { EmpresasService } from "./empresas.service";
import { EmpresasGrpcClient } from "./grpc/empresas.grpc-client";

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService, EmpresasGrpcClient],
  exports: [EmpresasService, EmpresasGrpcClient],
})
export class EmpresasModule {}
