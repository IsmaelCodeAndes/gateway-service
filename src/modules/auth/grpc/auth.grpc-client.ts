import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport, ClientOptions } from "@nestjs/microservices";
import { join } from "path";
import { Observable } from "rxjs";

export const AUTH_PACKAGE_NAME = 'auth'; // Cambia si tu package en el proto es diferente

export const authGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: AUTH_PACKAGE_NAME,
    protoPath: join(__dirname, '../../../proto/auth.proto'),
    url: process.env.AUTH_SERVICE_URL || 'localhost:5000', // Usa variable de entorno si quieres
  },
};

interface AuthServiceGrpc {
    CreateUsuario(data: any): Observable<any>;
    UpdateUsuario(data: any): Observable<any>;
    DeleteUsuario(data: any): Observable<any>;
    GetUsuario(data: any): Observable<any>;
    ListUsuarios(data: any): Observable<any>;
}

@Injectable()
export class AuthServiceGrpcClient implements OnModuleInit {
    @Client(authGrpcClientOptions)
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.AUTH_SERVICE_URL || 'localhost:5004', // Usa variable de entorno o localhost por defecto
            package: 'auth',
            protoPath: join(__dirname, '../../../proto/auth.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private authService: AuthServiceGrpc;

    onModuleInit() {
        this.authService = this.client.getService<AuthServiceGrpc>('AuthService');
    }

    get service() {
        return this.authService;
    }
}