import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Stock } from "./entities/stock.entity";
import { config } from "dotenv";
import { Inject } from "@nestjs/common";

config();

export class BrapiService {
  private baseEnpoint: string;
  private apiKey: string;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    this.baseEnpoint = "https://brapi.dev/api";
    this.apiKey = process.env.BRAPI_TOKEN;
  }

  async listStocks(): Promise<Stock[]> {
    // check if the stocks are in the cache
    const cachedStocks = await this.cacheManager.get("stocks");

    if (cachedStocks) {
      return cachedStocks as Stock[];
    }

    // if not, fetch the stocks from the API
    const response = await fetch(`${this.baseEnpoint}/quote/list?token=${this.apiKey}&type=stock`);
    const data = await response.json();
    const stocks = data.stocks;

    // save the stocks in the cache for 1 hour and return
    await this.cacheManager.set("stocks", stocks, 3600);
    return stocks.map((stock: any) => new Stock(stock));
  }
}
