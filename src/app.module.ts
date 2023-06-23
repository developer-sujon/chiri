import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { SectionModule } from './modules/section/section.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UserModule, AuthModule, TaskModule, SectionModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
