import { IsString } from 'class-validator';

export class LoginUsuarioDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
