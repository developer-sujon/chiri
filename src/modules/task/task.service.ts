import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { collections } from 'src/database/collection.config';
import { Task } from './entities/task.entity';
import { UpdatePositionTaskDto } from './dto/update-task-position.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(collections.task)
    private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { sectionID, userID } = createTaskDto;
    const tasksCount = await this.taskModel.find({ sectionID }).count();

    const task = await this.taskModel.create({
      sectionID,
      userID,
      position: tasksCount > 0 ? tasksCount : 0,
    });

    return task;
  }

  async findAll(query: unknown): Promise<Task[]> {
    return await this.taskModel
      .find(query)
      .populate('sectionID')
      .sort('-position');
  }

  updateById(id: Types.ObjectId, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = this.taskModel.findByIdAndUpdate(
      id,
      { $set: updateTaskDto },
      { new: true },
    );
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async removeById(id: Types.ObjectId): Promise<Task> {
    const task = await this.taskModel.findByIdAndDelete(id);

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updatePosition(
    updatePositionTaskDto: UpdatePositionTaskDto,
  ): Promise<void> {
    const {
      resourceSectionID,
      destinationSectionID,
      resourceList,
      destinationList,
    } = updatePositionTaskDto;

    const resourceListReverse = resourceList.reverse();
    const destinationListReverse = destinationList.reverse();

    if (resourceSectionID !== destinationSectionID) {
      for (const resourceKey in resourceListReverse) {
        await this.taskModel.findByIdAndUpdate(
          resourceListReverse[resourceKey].id,
          { $set: { sectionID: resourceSectionID, position: resourceKey } },
        );
      }
    }

    for (const destinationKey in destinationListReverse) {
      await this.taskModel.findByIdAndUpdate(
        destinationListReverse[destinationKey].id,
        {
          $set: {
            sectionID: destinationSectionID,
            position: destinationKey,
          },
        },
      );
    }

    return;
  }

  async removeMany(query: unknown): Promise<void> {
    await this.taskModel.deleteMany(query);
  }
}
