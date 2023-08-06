import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtModule } from '@nestjs/jwt';
import { Task } from './entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Task]),JwtModule],
  controllers: [TaskController],
  providers:[TaskService],
  exports: [TaskService],
})
export class TaskModule {}
