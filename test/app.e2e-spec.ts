import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from '../src/user/user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ]}).overrideProvider(UserService).useValue({
        list: () => ([])
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
