import { Controller, Get } from '@nestjs/common';
import { AgencyProjectsService } from './agency-projects.service';

@Controller('agency-projects')
export class AgencyProjectsController {
  constructor(private readonly agencyProjectsService: AgencyProjectsService) {}

  @Get()
  async findAll() {
    return this.agencyProjectsService.listAgencyProjects();
  }
}
