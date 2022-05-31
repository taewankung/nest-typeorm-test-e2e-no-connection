import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    if (env.NODE_ENV === 'test') {
      return {
        module: DatabaseModule,
      };
    }

    return {
      module: TypeOrmModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'firstNest',
          entities: [__dirname + '/../**/*.entity{.js,.ts}'],
          synchronize: true,
          keepConnectionAlive: true,
          retryAttempts: 2,
          retryDelay: 1000,
        }),
      ],
    };
  }

  static async forFeature(
    entities?: EntityClassOrSchema[],
    connection?: Connection | ConnectionOptions | string,
  ): Promise<DynamicModule> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    if (env.NODE_ENV === 'test') {
      return {
        module: DatabaseModule,
      };
    }
    return {
      module: TypeOrmModule,
      imports: [TypeOrmModule.forFeature(entities, connection)],
    };
  }
}
