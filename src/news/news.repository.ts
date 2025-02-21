import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(page: number, limit: number) {
    return this.prisma.news.findMany({ skip: (page - 1) * limit, take: limit });
  }

  count() {
    return this.prisma.news.count();
  }

  async create(data) {
    return await this.prisma.news.create({ data });
  }

  async getStatistics(ticker: string, startDate: string, endDate: string) {
    return await this.prisma.$queryRaw`
      SELECT
        DATE(date) AS news_date,
        COUNT(*)::INT AS totalNews,
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
