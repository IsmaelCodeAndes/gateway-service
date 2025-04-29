import { Controller, Get } from "@nestjs/common";
import { ProyectosService } from "./proyectos.service";

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  async findAll() {
    return this.proyectosService.listProyectos();
  }
}
