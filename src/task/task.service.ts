// task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskDto } from './dto/task.dto/task.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>, private jwtService: JwtService
  ) {}
  // constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository, private jwtService: JwtService) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
    return task;
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    const task = this.taskRepository.create(taskDto);
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, taskDto: TaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    task.description = taskDto.description;
    task.completed = taskDto.completed;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
  }
}
