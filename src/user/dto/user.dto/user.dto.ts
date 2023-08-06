// user/dto/user.dto.ts

import { IsNotEmpty, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  age: number;
}
