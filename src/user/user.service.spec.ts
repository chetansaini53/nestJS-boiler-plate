// user/user.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(userDto: UserDto): Promise<User> {
    const { name, email, password, age } = userDto;

    const existingUser = await this.userRepository.findOneBy({ email: email });
    if (existingUser) {
      throw new BadRequestException('Email is already registered.');
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.age = age;

    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new BadRequestException('Failed to create user.');
    }
  }

  // Implement other user-related methods (login, updateProfile, etc.) here.
}
