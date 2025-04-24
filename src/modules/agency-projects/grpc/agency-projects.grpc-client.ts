import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface AgencyProjectServiceGrpc {
  CreateAgencyProject(data: any): Observable<any>;
  UpdateAgencyProject(data: any): Observable<any>;
  DeleteAgencyProject(data: any): Observable<any>;
  GetAgencyProject(data: any): Observable<any>;
  ListAgencyProjects(data: any): Observable<any>;
}

@Injectable()
export class AgencyProjectsGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.AGENCY_PROJECTS_SERVICE_URL || 'localhost:5003', // Usa variable de entorno o localhost por defecto
      package: 'agenciesproject',
      protoPath: join(__dirname, '../../../proto/agencias-proyectos.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private agencyProjectService: AgencyProjectServiceGrpc;

  onModuleInit() {
    this.agencyProjectService = this.client.getService<AgencyProjectServiceGrpc>('AgencyProjectService');
  }

  get service() {
    return this.agencyProjectService;
  }
}
