import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

// Define la interfaz del servicio gRPC según el proto
interface AgenciasServiceGrpc {
  CreateAgencia(data: any): Observable<any>;
  GetAgencia(data: any): Observable<any>;
  ListAgencias(data: any): Observable<any>;
  UpdateAgencia(data: any): Observable<any>;
  DeleteAgencia(data: any): Observable<any>;
}

@Injectable()
export class AgenciesGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5002', // Puerto del microservicio de agencias
      package: 'agencias',
      protoPath: join(__dirname, '../../../proto/agencias.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private agenciasService: AgenciasServiceGrpc;

  onModuleInit() {
    this.agenciasService = this.client.getService<AgenciasServiceGrpc>('AgenciasService');
  }

  get service() {
    return this.agenciasService;
  }
}
