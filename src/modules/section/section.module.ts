import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { collections } from 'src/database/collection.config';
import { SectionSchema } from './entities/section.entity';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forFeature([
      { name: collections.section, schema: SectionSchema },
    ]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
