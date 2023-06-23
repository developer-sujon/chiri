import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { collections } from 'src/database/collection.config';
import { BoardSchema } from './entities/board.entity';
import { SectionModule } from '../section/section.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TaskModule,
    SectionModule,
    MongooseModule.forFeature([
      { name: collections.board, schema: BoardSchema },
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
