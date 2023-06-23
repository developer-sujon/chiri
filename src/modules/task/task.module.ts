import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { collections } from 'src/database/collection.config';
import { TaskSchema } from './entities/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: collections.task, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
