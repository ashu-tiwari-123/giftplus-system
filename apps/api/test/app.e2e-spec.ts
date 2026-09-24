import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- app.getHttpServer() is typed `any` by @nestjs/common
    return request(app.getHttpServer()).get('/').expect(200).expect({
      success: true,
      message: 'GiftPlus API is running',
      version: '1.0.0',
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
