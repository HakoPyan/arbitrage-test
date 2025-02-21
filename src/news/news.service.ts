import { promises as fs } from 'fs';
import { NewsRepository } from './news.repository';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class NewsService {
  private readonly filePath = 'mock_news.json';

  constructor(public newsRepo: NewsRepository) {}

  @Interval(10000)
  async importNews() {
    console.log(`[${new Date().toISOString()}] Starting cron job`);

    try {
      const content = await fs.readFile(this.filePath, 'utf8');
      const news: NewsReadPayload[] = JSON.parse(content);

      if (!Array.isArray(news) || news.length === 0) {
        console.log('No news items found.');
        return;
      }

      const firstNews: NewsReadPayload = news.shift();
      console.log('Processing news:', firstNews);

      const date = new Date(firstNews.date * 1000);
      const payload: NewsCreatePayload = { ...firstNews, date };

      try {
        console.log('Saving news to database...');
        const res = await this.newsRepo.create(payload);
        console.log('News saved:', res);
      } catch (dbError) {
        console.error('Database error:', dbError);
        news.unshift(firstNews);
        return;
      }

      await fs.writeFile(this.filePath, JSON.stringify(news, null, 2));
      console.log('Updated news file successfully.');
    } catch (error) {
      console.error('Error in importNews:', error);
    }
  }

  async findAll(page: number | string, limit: number | string) {
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);

    const [data, count] = await Promise.all([
      this.newsRepo.findAll(pageNumber, limitNumber),
      this.newsRepo.count(),
    ]);

    return { data, count, page: pageNumber, limit: limitNumber };
  }

  count() {
    return this.newsRepo.count();
  }

  async getStatistics(ticker: string, startDate: string, endDate: string) {
    return await this.newsRepo.getStatistics(ticker, startDate, endDate);
  }
}
