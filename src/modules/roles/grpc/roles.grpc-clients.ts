import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Observable } from "rxjs";

interface RolServiceGrpc {
    CreateRol(data: any): Observable<any>;
    GetRol(data: any): Observable<any>;
    ListRoles(data: any): Observable<any>;
    UpdateRol(data: any): Observable<any>;
    DeleteRol(data: any): Observable<any>;
}

@Injectable()
export class RolesGrpcClient implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.ROLES_SERVICE_URL || 'localhost:5020', // Usa variable de entorno o localhost por defecto
            package: 'rol',
            protoPath: join(__dirname, '../../../proto/roles.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private rolesService: RolServiceGrpc;

    onModuleInit() {
        this.rolesService = this.client.getService<RolServiceGrpc>('RolService');
    }

    get service() {
        return this.rolesService;
    }
}
