import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface PersonasServiceGrpc {
  CreatePersona(data: any): Observable<any>;
  GetPersona(data: any): Observable<any>;
  ListPersonas(data: any): Observable<any>;
  UpdatePersona(data: any): Observable<any>;
  DeletePersona(data: any): Observable<any>;
}

@Injectable()
export class PersonasGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.PERSONAS_SERVICE_URL || 'localhost:5014', // Usa variable de entorno o localhost por defecto
      package: 'personas',
      protoPath: join(__dirname, '../../../proto/personas.proto'),
    },
  })
  private readonly client: ClientGrpc;

  private personasService: PersonasServiceGrpc;

  onModuleInit() {
    this.personasService = this.client.getService<PersonasServiceGrpc>('PersonasService');
  }

  get service() {
    return this.personasService;
  }
}
