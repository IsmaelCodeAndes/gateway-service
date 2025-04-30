import { Controller, Get } from "@nestjs/common";
import { DocumentosService } from "./documentos.service";

@Controller('documentos')
export class DocumentosController {
    constructor(private readonly documentosService: DocumentosService) {}

    @Get()
    async findAll() {
        return this.documentosService.listDocumentos();
    }
}