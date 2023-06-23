import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { collections } from 'src/database/collection.config';
import { Section } from './entities/section.entity';
import { TaskService } from './../task/task.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(collections.section)
    private readonly sectionModel: Model<Section>,
    private readonly taskService: TaskService,
  ) {}

  create(createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionModel.create(createSectionDto);
  }

  async findById(id: Types.ObjectId): Promise<Section> {
    return await this.sectionModel.findById(id);
  }

  updateById(
    id: Types.ObjectId,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const section = this.sectionModel.findByIdAndUpdate(
      id,
      { $set: updateSectionDto },
      { new: true },
    );
    if (!section) throw new NotFoundException('Section not found');
    return section;
  }

  async removeById(id: Types.ObjectId): Promise<Section> {
    const section = await this.sectionModel.findByIdAndDelete(id);

    if (!section) throw new NotFoundException('Section not found');
    await this.taskService.removeManyBySectionID(section._id);
    return section;
  }
}
