import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateBoardDto {
  @IsMongoId()
  userID: Types.ObjectId;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  position: number;

  @IsBoolean()
  @IsOptional()
  favorite: boolean;

  @IsNumber()
  @IsOptional()
  favoritePosition: number;
}
