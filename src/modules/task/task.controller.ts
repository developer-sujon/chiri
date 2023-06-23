import {
  Controller,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UpdatePositionTaskDto } from './dto/update-task-position.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<{ data: Task; message: string }> {
    const task = await this.taskService.create(createTaskDto);
    return { data: task, message: 'Task created successfully' };
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: Types.ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<{ data: Task; message: string }> {
    const section = await this.taskService.updateById(id, updateTaskDto);
    return { data: section, message: 'Task update successfully' };
  }

  @Delete(':id')
  async removeById(
    @Param('id') id: Types.ObjectId,
  ): Promise<{ data: Task; message: string }> {
    const task = await this.taskService.removeById(id);
    return { data: task, message: 'Task delete successfully' };
  }

  @Put('position')
  async updatePosition(
    @Body() updatePositionTaskDto: UpdatePositionTaskDto,
  ): Promise<{ message: string }> {
    this.taskService.updatePosition(updatePositionTaskDto);

    return { message: 'Task position update successfully' };
  }
}
