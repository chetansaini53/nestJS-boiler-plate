// auth.controller.ts

import { Controller, Post, Body, ValidationPipe,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { GetUser } from '../user/get-user.decorator';
import { UserDto } from '../user/dto/user.dto/user.dto';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body(ValidationPipe) credentials: LoginCredentialsDto) {
    return this.authService.login(credentials.email, credentials.password);
  }
  @Post('/register')
  async register(@Body() userDto: UserDto) {
    return await this.authService.register(userDto);
  }
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@GetUser() user: User) {
    return await this.authService.logout(user);
  }

}
