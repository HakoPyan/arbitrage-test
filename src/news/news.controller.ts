import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(public newsService: NewsService) {}

  @Get()
  async listNews(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.newsService.findAll(page, limit);
  }

  @Get('stats')
  async getNewsStats(
    @Query('ticker') ticker: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.newsService.getStatistics(ticker, startDate, endDate);
  }
}
