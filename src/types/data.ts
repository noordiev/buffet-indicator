export interface DataPoint {
  date: string;
  marketCap: number;
  gdp: number;
  ratio: number;
}

export type TimeRange = '1M' | '1Y' | '5Y' | '10Y' | 'ALL';