import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from './grpc/auth.grpc-client';

@Injectable()
export class AuthService implements OnModuleInit {
  private usuariosService: any;
  private usuarioEmpresaRolesService: any;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usuariosService = this.client.getService('UsuariosService');
    this.usuarioEmpresaRolesService = this.client.getService('UsuarioEmpresaRolesService');
  }

  // === Usuarios ===
  async createUsuario(data: any) {
    return this.usuariosService.CreateUsuario(data).toPromise();
  }

  // === Login ===
  async loginUsuario(data: import('./dto/login-usuario.dto').LoginUsuarioDto) {
    return this.usuariosService.LoginUsuario(data).toPromise();
  }

  // === Validación de token ===
  async validateToken(data: import('./dto/validate-token.dto').ValidateTokenDto) {
    return this.usuariosService.ValidateToken(data).toPromise();
  }

  async findOneUsuario(data: any) {
    return this.usuariosService.FindOneUsuario(data).toPromise();
  }

  async findAllUsuarios(data: any) {
    return this.usuariosService.FindAllUsuarios(data).toPromise();
  }

  async updateUsuario(data: any) {
    return this.usuariosService.UpdateUsuario(data).toPromise();
  }

  async deleteUsuario(data: any) {
    return this.usuariosService.DeleteUsuario(data).toPromise();
  }

  // === UsuarioEmpresaRoles ===
  async listUsuarioEmpresaRoles(data: any) {
    return this.usuarioEmpresaRolesService.ListUsuarioEmpresaRoles(data).toPromise();
  }

  async updateUsuarioEmpresaRol(data: any) {
    return this.usuarioEmpresaRolesService.UpdateUsuarioEmpresaRol(data).toPromise();
  }

  async deleteUsuarioEmpresaRol(data: any) {
    return this.usuarioEmpresaRolesService.DeleteUsuarioEmpresaRol(data).toPromise();
  }
}