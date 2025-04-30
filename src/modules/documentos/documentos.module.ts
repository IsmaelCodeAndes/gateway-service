import { Module } from "@nestjs/common";
import { DocumentosController } from "./documentos.controller";
import { DocumentosService } from "./documentos.service";
import { DocumentosGrpcClient } from "./grpc/documentos.grpc-client";

@Module({
  controllers: [DocumentosController],
  providers: [DocumentosService, DocumentosGrpcClient],
  exports: [DocumentosService, DocumentosGrpcClient],
})
export class DocumentosModule {}