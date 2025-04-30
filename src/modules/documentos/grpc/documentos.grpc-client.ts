import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface DocumentoServiceGrpc {
  CreateDocumento(data: any): Observable<any>;
  GetDocumento(data: any): Observable<any>;
  ListDocumentos(data: any): Observable<any>;
  UpdateDocumento(data: any): Observable<any>;
  DeleteDocumento(data: any): Observable<any>;
}

@Injectable()
export class DocumentosGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.TIPO_DOCUMENTO_SERVICE_URL || 'localhost:5007', // Usa variable de entorno o localhost por defecto
      package: 'documento',
      protoPath: join(__dirname, '../../../proto/documento.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private documentosService: DocumentoServiceGrpc;

  onModuleInit() {
    this.documentosService = this.client.getService<DocumentoServiceGrpc>('DocumentoService');
  }

  get service() {
    return this.documentosService;
  }
}