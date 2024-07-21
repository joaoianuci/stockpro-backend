import { Stock } from "./stock.entity";

export interface HistoricalDataPrice {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

export class DetailedStock extends Stock {
  currency: string;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: Date;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  symbol: string;
  usedInterval: string;
  usedRange: string;
  historicalDataPrice: HistoricalDataPrice[];
  validRanges: string[];
  validIntervals: string[];
  priceEarnings: number;
  earningsPerShare: number;

  constructor(partial: Partial<DetailedStock>) {
    super(partial);
    Object.assign(this, partial);
  }

  getLogo() {
    return this.logo;
  }

  getDividendYield() {
    return this.priceEarnings;
  }

  getEarningsPerShare() {
    return this.earningsPerShare;
  }

  getTodayPrice() {
    return this.regularMarketPrice;
  }

  getNames() {
    return {
      shortName: this.shortName,
      longName: this.longName,
    };
  }

  getMaxPrice() {
    // considering a minimum earning per share of 6%, we can calculate the maximum price that we can pay for the stock
    return this.earningsPerShare / 0.06;
  }
}
