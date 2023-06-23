import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { collections } from 'src/database/collection.config';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Section extends Document {
  @Prop({ type: Types.ObjectId, ref: collections.board, required: true })
  boardID: Types.ObjectId;

  @Prop()
  title: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
