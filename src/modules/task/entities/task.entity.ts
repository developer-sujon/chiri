import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { collections } from 'src/database/collection.config';
import { schemaOptions } from 'src/database/schemaOptions';

@Schema(schemaOptions)
export class Task extends Document {
  @Prop({ type: Types.ObjectId, ref: collections.user, required: true })
  userID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: collections.section, required: true })
  sectionID: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Number })
  position: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
