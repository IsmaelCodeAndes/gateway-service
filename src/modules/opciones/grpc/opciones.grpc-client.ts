import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface OpcionesServiceGrpc {
  CreateOpcion(data: any): Observable<any>;
  GetOpcion(data: any): Observable<any>;
  ListOpciones(data: any): Observable<any>;
  UpdateOpcion(data: any): Observable<any>;
  DeleteOpcion(data: any): Observable<any>;
}

@Injectable()
export class OpcionesGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.OPCIONES_SERVICE_URL || 'localhost:5022', // Usa variable de entorno o localhost por defecto
      package: 'opciones',
      protoPath: join(__dirname, '../../../proto/opciones.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private opcionesService: OpcionesServiceGrpc;

  onModuleInit() {
    this.opcionesService = this.client.getService<OpcionesServiceGrpc>('OpcionesService');
  }

  get service() {
    return this.opcionesService;
  }
}