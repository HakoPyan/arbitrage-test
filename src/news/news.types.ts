interface BaseNewsPayload {
  title: string;
  description: string;
  platform: string;
  author: string;
  ticker: string;
  sentiment: number;
}

interface NewsReadPayload extends BaseNewsPayload {
  date: number;
}

interface NewsCreatePayload extends BaseNewsPayload {
  date: Date;
}
