import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { collections } from 'src/database/collection.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: collections.user, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
