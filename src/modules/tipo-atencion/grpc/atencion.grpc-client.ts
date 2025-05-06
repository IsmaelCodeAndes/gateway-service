import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Observable } from "rxjs";

interface AtencionServiceGrpc {
    CreateAtencion(data: any): Observable<any>;
    GetAtencion(data: any): Observable<any>;
    ListAtenciones(data: any): Observable<any>;
    UpdateAtencion(data: any): Observable<any>;
    DeleteAtencion(data: any): Observable<any>;
}

@Injectable()
export class AtencionGrpcClient implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.TIPO_ATENCION_SERVICE_URL || 'localhost:5035', // Usa variable de entorno o localhost por defecto
            package: 'atencion',
            protoPath: join(__dirname, '../../../proto/atencion.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private atencionService: AtencionServiceGrpc;

    onModuleInit() {
        this.atencionService = this.client.getService<AtencionServiceGrpc>('AtencionService');
    }

    get service() {
        return this.atencionService;
    }
}
