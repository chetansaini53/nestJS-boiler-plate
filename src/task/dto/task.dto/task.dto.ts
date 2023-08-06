// task.dto.ts

import { IsNotEmpty, IsBoolean } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  completed: boolean;
}
