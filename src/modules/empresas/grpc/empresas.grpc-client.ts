import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface EmpresasServiceGrpc {
  CreateEmpresa(data: any): Observable<any>;
  GetEmpresa(data: any): Observable<any>;
  ListEmpresas(data: any): Observable<any>;
  UpdateEmpresa(data: any): Observable<any>;
  DeleteEmpresa(data: any): Observable<any>;
}

@Injectable()
export class EmpresasGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.EMPRESAS_SERVICE_URL || 'localhost:5004', // Usa variable de entorno o localhost por defecto
      package: 'empresas',
      protoPath: join(__dirname, '../../../proto/empresas.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private empresasService: EmpresasServiceGrpc;

  onModuleInit() {
    this.empresasService = this.client.getService<EmpresasServiceGrpc>('EmpresasService');
  }

  get service() {
    return this.empresasService;
  }
}
