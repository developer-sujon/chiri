import { IsNumber, IsOptional, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsMongoId()
  userID: Types.ObjectId;

  @IsMongoId()
  sectionID: Types.ObjectId;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  @IsOptional()
  position: number;
}
