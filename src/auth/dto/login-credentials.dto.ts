// auth/dto/login-credentials.dto.ts

import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
