import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Types } from 'mongoose';
import { UpdatePositionBoardDto } from './dto/update-board-position.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<{ data: Board; message: string }> {
    const board = await this.boardService.create(createBoardDto.userID);
    return { data: board, message: 'Board created successfully' };
  }

  @Get()
  findAll(@Param('userID') userID: Types.ObjectId): Promise<Board[]> {
    return this.boardService.findAll(userID);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Param('userID') userID: Types.ObjectId,
  ): Promise<Board> {
    return this.boardService.findOne(id, userID);
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardService.updateById(id, updateBoardDto);
  }

  @Get('favorites')
  async findFavorite(
    @Param('userID') userID: Types.ObjectId,
  ): Promise<Board[]> {
    return this.boardService.findFavorite(userID);
  }

  @Put('favorites')
  async updateFavoritePosition(
    @Body() updatePositionBoardDto: UpdatePositionBoardDto,
  ): Promise<{ message: string }> {
    await this.boardService.updateFavoritePosition(updatePositionBoardDto);

    return { message: 'Favorite position updated' };
  }

  @Delete(':id')
  removeById(@Param('id') id: Types.ObjectId) {
    return this.boardService.removeById(id);
  }
}
