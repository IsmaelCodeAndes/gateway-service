import { Controller, Get } from "@nestjs/common";
import { EmpresasService } from "./empresas.service";

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Get()
  async findAll() {
    return this.empresasService.listEmpresas();
  }
}
