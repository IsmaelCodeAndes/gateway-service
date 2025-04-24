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
export class ProjectsGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.PROJECTS_SERVICE_URL || 'localhost:5001', // Usa variable de entorno o localhost por defecto
      package: 'proyectos',
      protoPath: join(__dirname, '../../../proto/proyectos.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private proyectosService: ProyectosServiceGrpc;

  onModuleInit() {
    this.proyectosService = this.client.getService<ProyectosServiceGrpc>('ProyectosService');
  }

  get service() {
    return this.proyectosService;
  }
}
