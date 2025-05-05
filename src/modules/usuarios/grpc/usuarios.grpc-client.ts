import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface UsuarioServiceGrpc {
    CreateUsuario(data: any): Observable<any>;
    GetUsuario(data: any): Observable<any>;
    ListUsuarios(data: any): Observable<any>;
    UpdateUsuario(data: any): Observable<any>;
    DeleteUsuario(data: any): Observable<any>;
}

@Injectable()
export class UsuariosGrpcClient implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.USUARIOS_SERVICE_URL || 'localhost:5021', // Usa variable de entorno o localhost por defecto
            package: 'usuario',
            protoPath: join(__dirname, '../../../proto/usuarios.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private usuariosService: UsuarioServiceGrpc;

    onModuleInit() {
        this.usuariosService = this.client.getService<UsuarioServiceGrpc>('UsuarioService');
    }

    get service() {
        return this.usuariosService;
    }
}
