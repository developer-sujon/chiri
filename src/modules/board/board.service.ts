import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskService } from './../task/task.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { collections } from 'src/database/collection.config';
import { Board } from './entities/board.entity';
import { SectionService } from '../section/section.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdatePositionBoardDto } from './dto/update-board-position.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(collections.board)
    private readonly boardModel: Model<Board>,
    private readonly taskService: TaskService,
    private readonly sectionService: SectionService,
  ) {}

  async create(userID: Types.ObjectId): Promise<Board> {
    const boardsCount = await this.boardModel.find().count();

    const board = await this.boardModel.create({
      userID,
      position: boardsCount > 0 ? boardsCount : 0,
    });

    return board;
  }

  findAll(userID: Types.ObjectId): Promise<Board[]> {
    return this.boardModel.find({ userID }).sort('-position');
  }

  async findOne(id: Types.ObjectId, userID: Types.ObjectId) {
    const board = await this.boardModel.findOne({ userID, _id: id });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const sections = await this.sectionService.findAll({ boardID: id });

    let plainSection: [{}];

    for (const section of sections) {
      const tasks = await this.taskService.findAll({ sectionID: section._id });
      plainSection;
    }

    return board;
  }

  async updateById(
    id: Types.ObjectId,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const { favorite } = updateBoardDto;

    const currentBoard = await this.findById(id);
    if (!currentBoard) throw new NotFoundException('Board not found');

    if (favorite !== undefined && currentBoard.favorite !== favorite) {
      const favorites = await this.boardModel
        .find({
          userID: currentBoard.userID,
          favorite: true,
          _id: { $ne: id },
        })
        .sort('favoritePosition');

      if (favorite) {
        updateBoardDto.favoritePosition =
          favorites.length > 0 ? favorites.length : 0;
      } else {
        for (const key in favorites) {
          const element = favorites[key];

          await this.boardModel.findByIdAndUpdate(element._id, {
            $set: { favoritePosition: key },
          });
        }
      }
    }

    return await this.boardModel.findByIdAndUpdate(id, {
      $set: updateBoardDto,
    });
  }

  async findFavorite(userID: Types.ObjectId) {
    return await this.boardModel
      .find({ userID, favorite: true })
      .sort('-favoritePosition');
  }

  async updateFavoritePosition(
    updatePositionBoardDto: UpdatePositionBoardDto,
  ): Promise<void> {
    const { boardList } = updatePositionBoardDto;

    for (const key in boardList.reverse()) {
      const board = boardList[key];

      await this.boardModel.findByIdAndUpdate(board.id, {
        $set: { favoritePosition: key },
      });
    }
  }

  async findById(id: Types.ObjectId): Promise<Board> {
    return await this.boardModel.findById(id);
  }

  async removeById(id: Types.ObjectId): Promise<void> {
    const sections = await this.sectionService.findAll({ boardID: id });

    for (const section of sections) {
      await this.taskService.removeMany({ sectionID: section._id });
    }

    await this.sectionService.removeMany({ boardID: id });

    const currentBoard = await this.findById(id);

    if (currentBoard.favorite) {
      const favorites = await this.boardModel
        .find({
          userID: currentBoard.userID,
          favorite: true,
          _id: { $ne: id },
        })
        .sort('favoritePosition');

      for (const key in favorites) {
        const element = favorites[key];
        await this.boardModel.findByIdAndUpdate(element._id, {
          $set: { favoritePosition: key },
        });
      }
    }

    await this.boardModel.findByIdAndDelete(id);

    const boards = await this.boardModel.find().sort('position');

    for (const key in boards) {
      const element = boards[key];
      await this.boardModel.findByIdAndUpdate(element._id, {
        $set: { position: key },
      });
    }
  }
}
