import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSectionDto {
  @IsMongoId()
  boardID: Types.ObjectId;

  @IsString()
  @IsOptional()
  title: string;
}
