import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from 'src/article/article.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TaskService {
  @Inject(ArticleService)
  private articleService: ArticleService;

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleCron() {
    console.log('task execute');
    await this.articleService.flushRedisToDB();
  }
}
