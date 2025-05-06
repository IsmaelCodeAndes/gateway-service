import { Module } from "@nestjs/common";
import { ContactoController } from "./contacto.controller";
import { ContactoService } from "./contacto.service";
import { ContactoGrpcClient } from "./grpc/contacto.grpc-client";

@Module({
    controllers: [ContactoController],
    providers: [ContactoService, ContactoGrpcClient],
    exports: [ContactoService],
})
export class ContactoModule {}