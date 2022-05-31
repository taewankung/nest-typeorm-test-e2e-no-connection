import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import {Connection, createConnection} from 'typeorm'
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    DatabaseModule.forRoot(), 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {
  constructor(){

  }
}
