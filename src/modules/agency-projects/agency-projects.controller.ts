import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AgencyProjectsService } from './agency-projects.service';

@ApiTags('agency-projects')
@Controller('agency-projects')
export class AgencyProjectsController {
  constructor(private readonly agencyProjectsService: AgencyProjectsService) {}

  @Get('full')
  @ApiQuery({ name: 'agenciaId', required: false, description: 'Filtrar por ID de agencia' })
  @ApiQuery({ name: 'proyectoId', required: false, description: 'Filtrar por ID de proyecto' })
  async findAllFull(
    @Query('agenciaId') agenciaId?: string,
    @Query('proyectoId') proyectoId?: string,
  ) {
    return this.agencyProjectsService.listFullAgencyProjects({ agenciaId, proyectoId });
  }


}
