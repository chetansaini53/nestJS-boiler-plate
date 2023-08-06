import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({  email: email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    return user;
  }

  
  deleteUser(user: User) {
    throw new Error('Method not implemented.');
  }
  getUserImage(userId: string) {
    throw new Error('Method not implemented.');
  }
  uploadImage(user: User, image: any) {
    throw new Error('Method not implemented.');
  }
  updateProfile(user: User, userDto: UserDto) {
    throw new Error('Method not implemented.');
  }
  getLoggedInUser(user: User) {
    throw new Error('Method not implemented.');
  }
  
  
}

