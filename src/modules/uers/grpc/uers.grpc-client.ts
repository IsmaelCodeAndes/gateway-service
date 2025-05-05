import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Observable } from "rxjs";

interface UERServiceGrpc {
    CreateUER(data: any): Observable<any>;
    GetUER(data: any): Observable<any>;
    ListUERs(data: any): Observable<any>;
    UpdateUER(data: any): Observable<any>;
    DeleteUER(data: any): Observable<any>;
}

@Injectable()
export class UersGrpcClient implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.UERS_SERVICE_URL || 'localhost:5023', // Usa variable de entorno o localhost por defecto
            package: 'uer',
            protoPath: join(__dirname, '../../../proto/uers.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private uersService: UERServiceGrpc;

    onModuleInit() {
        this.uersService = this.client.getService<UERServiceGrpc>('UERService');
    }

    get service() {
        return this.uersService;
    }
}
