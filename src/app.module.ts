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

@Module({
  imports: [AgenciesModule, ProjectsModule, AgencyProjectsModule, EmpresasModule, ProyectosInmobiliariosModule, DocumentosModule, PersonasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
