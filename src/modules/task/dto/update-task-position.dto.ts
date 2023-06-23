import { IsMongoId, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePositionTaskDto {
  @IsMongoId()
  resourceSectionID: Types.ObjectId;

  @IsMongoId()
  destinationSectionID: Types.ObjectId;

  @IsArray()
  resourceList: Array<Types.ObjectId>;

  @IsArray()
  destinationList: Array<Types.ObjectId>;
}
