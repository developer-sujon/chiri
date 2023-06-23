import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { collections } from 'src/database/collection.config';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Board extends Document {
  @Prop({ type: Types.ObjectId, ref: collections.user, required: true })
  userID: Types.ObjectId;

  @Prop({ type: String, default: '📃' })
  icon: string;

  @Prop({ type: String, default: 'Untitled' })
  title: string;

  @Prop({
    type: String,
    default: `Add description here
  🟢 You can add multiline description
  🟢 Let's start...`,
  })
  description: string;

  @Prop({ type: Number })
  position: number;

  @Prop({ type: Boolean, default: false })
  favorite: boolean;

  @Prop({ type: Number, default: 0 })
  favoritePosition: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
