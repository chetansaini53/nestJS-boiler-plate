// auth.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../user/dto/user.dto/user.dto';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createJwtToken(userId: number): Promise<string> {
    const payload: JwtPayload = { userId };
    return this.jwtService.sign(payload);
  }
  async validateUserById(userId: number): Promise<User | null> {
    // Implement the logic to validate the user by their ID
    // For example, you can fetch the user from the database using the userId
    // Return the user if found, or null if not found
    return null;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try{
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
          throw new NotFoundException('User not found.');
        }
        if (user.password !== password) {
          throw new BadRequestException('Invalid password.');
        }
        console.log(user);
        const accessToken = await this.jwtService.signAsync({ userId: user.id }, {'secret':`${process.env.JWT_SECRET}`});
        console.log(accessToken);
        return { accessToken };
    }catch (error) {
        // Handle the exceptions here
        // You can log the error, throw a custom exception, or take any other appropriate action
        console.error('Error occurred during login:', error);
        throw new Error('Login failed.'); // For example, throwing a custom error
      }
    
    
  }
  

  async register(userDto: UserDto): Promise<User> {
    const { name, email, password, age } = userDto;
    // Check if the email is already registered to avoid duplicates
    const user = await this.usersRepository.findOneBy({  email: email });
    if (user) {
      throw new BadRequestException('Email is already registered.');
    }
  
    // Create a new user entity and set its properties
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password; // Remember to hash the password before saving it to the database for security purposes.
    newUser.age = age;
  
    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      // Log the exact error for debugging purposes
      console.error('Error while creating user:', error.message);
      throw new InternalServerErrorException('Failed to create user.');
    }
  }
  async logout(user: User) {
    throw new Error('Method not implemented.');
  }
  // Add other methods for token verification and refresh token handling if needed.
}
