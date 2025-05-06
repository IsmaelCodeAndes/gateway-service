import { Controller, Get } from "@nestjs/common";
import { ContactoService } from "./contacto.service";

@Controller('contactos')
export class ContactoController {
    constructor(private readonly contactoService: ContactoService) {}

    @Get()
    async findAll() {
        return this.contactoService.listContactos();
    }
}