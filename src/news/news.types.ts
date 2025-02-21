interface BaseNewsPayload {
  title: string;
  description: string;
  platform: string;
  author: string;
  ticker: string;
  sentiment: number;
}

export interface NewsReadPayload extends BaseNewsPayload {
  date: number;
}

export interface NewsCreatePayload extends BaseNewsPayload {
  date: Date;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
}

export interface NewsStatistics {
  news_date: Date;
  coinNews: number;
  coinNewsRatio: number;
  avgSentiment: number;
}
