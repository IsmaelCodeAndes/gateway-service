import { Controller, Get } from "@nestjs/common";
import { OpcionesService } from "./opciones.service";

@Controller('opciones')
export class OpcionesController {
    constructor(private readonly opcionesService: OpcionesService) {}

    @Get()
    async findAll() {
        return this.opcionesService.listOpciones();
    }
}
