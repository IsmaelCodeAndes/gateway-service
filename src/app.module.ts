import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgenciesModule } from './modules/agencies/agencies.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AgencyProjectsModule } from './modules/agency-projects/agency-projects.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { ProyectosInmobiliariosModule } from './modules/proyectos-inmobiliarios/proyectos.module';
import { DocumentosModule } from './modules/documentos/documentos.module';
import { PersonasModule } from './modules/personas/personas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { OpcionesModule } from './modules/opciones/opciones.module';
import { RolesModule } from './modules/roles/roles.module';
import { UersModule } from './modules/uers/uers.module';
import { ClienteModule } from './modules/clientes/cliente.module';
import { ContactoModule } from './modules/medios-contacto/contacto.module';
import { AtencionModule } from './modules/tipo-atencion/atencion.module';

@Module({
  imports: [
    AgenciesModule, 
    ProjectsModule, 
    AgencyProjectsModule, 
    EmpresasModule, 
    ProyectosInmobiliariosModule, 
    DocumentosModule, 
    PersonasModule, 
    UsuariosModule, 
    OpcionesModule, 
    RolesModule, 
    UersModule, 
    ClienteModule,
    ContactoModule,
    AtencionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
