import { Controller, Get } from "@nestjs/common";
import { AtencionService } from "./atencion.service";

@Controller('atenciones')
export class AtencionController {
    constructor(private readonly atencionService: AtencionService) {}

    @Get()
    async findAll() {
        return this.atencionService.listAtenciones();
    }
}