import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    if(env.NODE_ENV==='test'){

      return {
        module: DatabaseModule,
      }
    }
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [__dirname + '/**/*.entity{.js,.ts}'],
          synchronize: true,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
        }),
      ],
    };
  }

  static async forFeature(entities?: EntityClassOrSchema[], connection?: Connection | ConnectionOptions | string): Promise<DynamicModule> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    if(env.NODE_ENV==='test'){
      return {
        module: DatabaseModule,
      }
    }
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forFeature(entities, connection),
      ],
    };
  }
}