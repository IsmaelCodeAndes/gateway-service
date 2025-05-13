import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // === Login ===
  @Post('login')
  async login(@Body() dto: LoginUsuarioDto) {
    return this.authService.loginUsuario(dto);
  }

  // === Validación de token ===
  @Post('validate-token')
  async validateToken(@Body() dto: ValidateTokenDto) {
    return this.authService.validateToken(dto);
  }

  // === Usuarios ===
  @Post('usuarios')
  async createUsuario(@Body() body: any) {
    return this.authService.createUsuario(body);
  }

  @Get('usuarios/:id')
  async findOneUsuario(@Param('id') id: number) {
    return this.authService.findOneUsuario({ usuario_id: Number(id) });
  }

  @Get('usuarios')
  async findAllUsuarios(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.authService.findAllUsuarios({ page: Number(page), limit: Number(limit) });
  }

  @Put('usuarios/:id')
  async updateUsuario(@Param('id') id: number, @Body() body: any) {
    return this.authService.updateUsuario({ usuario_id: Number(id), ...body });
  }

  @Delete('usuarios/:id')
  async deleteUsuario(@Param('id') id: number) {
    return this.authService.deleteUsuario({ usuario_id: Number(id) });
  }

  // === UsuarioEmpresaRoles ===
  @Get('usuario-empresa-roles')
  async listUsuarioEmpresaRoles(
    @Query('usuario_id') usuario_id: number,
    @Query('empresa_id') empresa_id?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return this.authService.listUsuarioEmpresaRoles({
      usuario_id: Number(usuario_id),
      empresa_id: empresa_id ? Number(empresa_id) : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Put('usuario-empresa-roles/:id')
  async updateUsuarioEmpresaRol(@Param('id') id: number, @Body() body: any) {
    return this.authService.updateUsuarioEmpresaRol({ usuario_empresa_rol_id: Number(id), ...body });
  }

  @Delete('usuario-empresa-roles/:id')
  async deleteUsuarioEmpresaRol(@Param('id') id: number) {
    return this.authService.deleteUsuarioEmpresaRol({ usuario_empresa_rol_id: Number(id) });
  }
}
