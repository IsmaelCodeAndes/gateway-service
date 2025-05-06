import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Observable } from "rxjs";

interface ContactoServiceGrpc {
    CreateContacto(data: any): Observable<any>;
    GetContacto(data: any): Observable<any>;
    ListContactos(data: any): Observable<any>;
    UpdateContacto(data: any): Observable<any>;
    DeleteContacto(data: any): Observable<any>;
}

@Injectable()
export class ContactoGrpcClient implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: process.env.MEDIO_CONTACTO_SERVICE_URL || 'localhost:5031', // Usa variable de entorno o localhost por defecto
            package: 'contacto',
            protoPath: join(__dirname, '../../../proto/contacto.proto'),
        },
    })
    private readonly client: ClientGrpc;

    private contactoService: ContactoServiceGrpc;

    onModuleInit() {
        this.contactoService = this.client.getService<ContactoServiceGrpc>('ContactoService');
    }

    get service() {
        return this.contactoService;
    }
}
