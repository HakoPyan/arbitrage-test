import { Injectable } from '@nestjs/common';
import { News, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { NewsStatistics } from './news.types';

@Injectable()
export class NewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(page: number, limit: number): PrismaPromise<News[]> {
    return this.prisma.news.findMany({ skip: (page - 1) * limit, take: limit });
  }

  count(): PrismaPromise<number> {
    return this.prisma.news.count();
  }

  async create(data): Promise<News> {
    return await this.prisma.news.create({ data });
  }

  async getStatistics(
    ticker: string,
    startDate: string,
    endDate: string,
  ): Promise<NewsStatistics[]> {
    return await this.prisma.$queryRaw`
      SELECT
        DATE(date) AS news_date,
        COUNT(*) FILTER (WHERE ticker = ${ticker})::INT AS coinNews,
        ROUND(COUNT(*) FILTER (WHERE ticker = ${ticker}) * 1.0 / NULLIF(COUNT(*), 0), 2) AS coinNewsRatio,
        ROUND(COALESCE(AVG(sentiment) FILTER (WHERE ticker = ${ticker}), 0), 0) AS avgSentiment
      FROM "News"
      WHERE date BETWEEN ${startDate}::DATE AND ${endDate}::DATE
      GROUP BY news_date
      HAVING COUNT(*) FILTER (WHERE ticker = ${ticker}) > 0
      ORDER BY news_date;
    `;
  }
}
