import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Types } from 'mongoose';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  async create(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<{ data: Section; message: string }> {
    const section = await this.sectionService.create(createSectionDto);
    return { data: section, message: 'Section created successfully' };
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: Types.ObjectId,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<{ data: Section; message: string }> {
    const section = await this.sectionService.updateById(id, updateSectionDto);
    return { data: section, message: 'Section update successfully' };
  }

  @Delete(':id')
  async removeById(
    @Param('id') id: Types.ObjectId,
  ): Promise<{ data: Section; message: string }> {
    const section = await this.sectionService.removeById(id);
    return { data: section, message: 'Section delete successfully' };
  }
}
