import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface ProyectosServiceGrpc {
  CreateProyecto(data: any): Observable<any>;
  GetProyecto(data: any): Observable<any>;
  ListProyectos(data: any): Observable<any>;
  UpdateProyecto(data: any): Observable<any>;
  DeleteProyecto(data: any): Observable<any>;
}

@Injectable()
export class ProyectosGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.PROYECTOS_INMOBILIARIOS_SERVICE_URL || 'localhost:5005', // Usa variable de entorno o localhost por defecto
      package: 'proyectosinmobiliarios',
      protoPath: join(__dirname, '../../../proto/proyectosInmobiliarios.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private proyectosService: ProyectosServiceGrpc;

  onModuleInit() {
    this.proyectosService = this.client.getService<ProyectosServiceGrpc>('ProyectosInmobiliariosService');
  }

  get service() {
    return this.proyectosService;
  }
}
