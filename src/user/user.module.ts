import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
