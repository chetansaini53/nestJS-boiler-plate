import { Controller, Post, Body, Get, Put, Delete, UseGuards, Req, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto/user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import  { CommonUtils } from '../common.utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private commonUtils: CommonUtils) {}

  
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getLoggedInUser(@Param() params: any) {
    const randomString = this.commonUtils.generateRandomCode(10);
    console.log(randomString);
    const user = await this.userService.getUserById(params.userId);
    return user;
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@GetUser() user: User, @Body() userDto: UserDto) {
    return await this.userService.updateProfile(user, userDto);
  }

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  async uploadImage(@GetUser() user: User, @Body() image: any) {
    return await this.userService.uploadImage(user, image);
  }

  @Get(':userId/avatar')
  @UseGuards(JwtAuthGuard)
  async getUserImage(@Param('userId') userId: string) {
    return await this.userService.getUserImage(userId);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@GetUser() user: User) {
    return await this.userService.deleteUser(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

}
