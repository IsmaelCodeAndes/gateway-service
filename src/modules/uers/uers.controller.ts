import { Controller, Get } from "@nestjs/common";
import { UersService } from "./uers.service";

@Controller('uers')
export class UersController {
    constructor(private readonly uersService: UersService) {}

    @Get()
    async findAll() {
        return this.uersService.listUers();
    }
}