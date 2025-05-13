import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { authGrpcClientOptions } from './grpc/auth.grpc-client';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        ...authGrpcClientOptions,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
