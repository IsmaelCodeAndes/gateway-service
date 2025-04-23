import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgenciesModule } from './modules/agencies/agencies.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AgencyProjectsModule } from './modules/agency-projects/agency-projects.module';

@Module({
  imports: [AgenciesModule, ProjectsModule, AgencyProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
