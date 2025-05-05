import { Module } from "@nestjs/common";
import { UersController } from "./uers.controller";
import { UersService } from "./uers.service";
import { UersGrpcClient } from "./grpc/uers.grpc-client";

@Module({
    controllers: [UersController],
    providers: [UersService, UersGrpcClient],
    exports: [UersService, UersGrpcClient]
})
export class UersModule {}