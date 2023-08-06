// task.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { TaskDto } from './dto/task.dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.createTask(taskDto);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.updateTask(id, taskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
