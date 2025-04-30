import { Module } from "@nestjs/common";
import { PersonasController } from "./personas.controller";
import { PersonasService } from "./personas.service";
import { PersonasGrpcClient } from "./grpc/personas.grpc-client";

@Module({
  controllers: [PersonasController],
  providers: [PersonasService, PersonasGrpcClient],
  exports: [PersonasService, PersonasGrpcClient]
})
export class PersonasModule {}