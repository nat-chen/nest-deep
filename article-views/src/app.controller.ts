import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './article/entities/article.entity';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  @InjectEntityManager()
  private entityManager: EntityManager;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'nat',
      password: '111111',
    });
    await this.entityManager.save(User, {
      username: 'nicole',
      password: '222222',
    });
    await this.entityManager.save(Article, {
      title: 'first article title',
      content: 'first article content',
    });
    await this.entityManager.save(Article, {
      title: 'second article title',
      content: 'second article content',
    });
    return 'done';
  }
}
