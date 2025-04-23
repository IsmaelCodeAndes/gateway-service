import { Injectable } from '@nestjs/common';
import { AgenciesGrpcClient } from '../agencies/grpc/agencies.grpc-client';
import { ProjectsGrpcClient } from '../projects/grpc/projects.grpc-client';
import { AgencyProjectsGrpcClient } from './grpc/agency-projects.grpc-client';

@Injectable()
export class AgencyProjectsService {
  constructor(
    private readonly agenciesGrpcClient: AgenciesGrpcClient,
    private readonly projectsGrpcClient: ProjectsGrpcClient,
    private readonly agencyProjectsGrpcClient: AgencyProjectsGrpcClient,
  ) {}

  async listFullAgencyProjects(filters: { agenciaId?: string; proyectoId?: string } = {}) {
    // 1. Obtener relaciones N:M
    const relationsResponse = await this.agencyProjectsGrpcClient.service.ListAgencyProjects({}).toPromise();
    const relations = relationsResponse?.data || relationsResponse?.agencyProjects || [];

    // 2. Obtener agencias y proyectos
    const [agenciesResponse, projectsResponse] = await Promise.all([
      this.agenciesGrpcClient.service.ListAgencias({}).toPromise(),
      this.projectsGrpcClient.service.ListProyectos({}).toPromise(),
    ]);
    const agencies = agenciesResponse?.agencias || [];
    const projects = projectsResponse?.proyectos || [];

    // 3. Armar join enriquecido
    let result = relations.map((rel: any) => ({
      id: rel.id,
      created_at: rel.created_at,
      agencia: agencies.find((a: any) => a.id === (rel.agenciaId || rel.agencyId)),
      proyecto: projects.find((p: any) => p.id === (rel.proyectoId || rel.projectId)),
    }));

    if (filters.agenciaId) {
      result = result.filter((r: any) => r.agencia?.id === filters.agenciaId);
    }
    if (filters.proyectoId) {
      result = result.filter((r: any) => r.proyecto?.id === filters.proyectoId);
    }

    return result;
  }
}

