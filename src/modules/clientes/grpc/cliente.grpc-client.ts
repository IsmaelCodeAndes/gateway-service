import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Observable } from "rxjs";

interface ClienteServiceGrpc {
    CreateCliente(data: any): Observable<any>;
    GetCliente(data: any): Observable<any>;
    ListClientes(data: any): Observable<any>;
    UpdateCliente(data: any): Observable<any>;
    DeleteCliente(data: any): Observable<any>;
}

@Injectable()
export class ClienteGrpcClient implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.CLIENTES_SERVICE_URL || 'localhost:5026', // Usa variable de entorno o localhost por defecto
            package: 'cliente',
            protoPath: join(__dirname, '../../../proto/clientes.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private clienteService: ClienteServiceGrpc;

    onModuleInit() {
        this.clienteService = this.client.getService<ClienteServiceGrpc>('ClienteService');
    }

    get service() {
        return this.clienteService;
    }
}
