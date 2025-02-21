import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { NewsController } from './news.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
