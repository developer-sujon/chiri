import { IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePositionBoardDto {
  @IsArray()
  boardList: Array<Types.ObjectId>;
}
