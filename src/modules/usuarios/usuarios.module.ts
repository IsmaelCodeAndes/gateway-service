import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { UsuariosGrpcClient } from "./grpc/usuarios.grpc-client";

@Module({
    controllers: [UsuariosController],
    providers: [UsuariosService, UsuariosGrpcClient],
    exports: [UsuariosService, UsuariosGrpcClient]
})
export class UsuariosModule {}
