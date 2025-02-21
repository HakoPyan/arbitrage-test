import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsStatistics, PaginatedResult } from './news.types';
import { News } from '@prisma/client';

@Controller('news')
export class NewsController {
  constructor(public newsService: NewsService) {}

  @Get()
  async listNews(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<PaginatedResult<News>> {
    return await this.newsService.findAll(page, limit);
  }

  @Get('stats')
  async getNewsStats(
    @Query('ticker') ticker: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<NewsStatistics[]> {
    return await this.newsService.getStatistics(ticker, startDate, endDate);
  }
}
