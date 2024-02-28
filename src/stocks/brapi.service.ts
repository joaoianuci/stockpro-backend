import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Stock } from "./entities/stock.entity";
import { config } from "dotenv";
import { Inject } from "@nestjs/common";
import { DetailedStock } from "./entities/detailed-stock.entity";
import { AssetType, AssetTypeForBrapiFetch } from "src/types/brapi.types";

config();

export class BrapiService {
  private baseEnpoint: string;
  private apiKey: string;

  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;

  constructor() {
    this.baseEnpoint = "https://brapi.dev/api";
    this.apiKey = process.env.BRAPI_TOKEN;
  }

  async listAssets(type: AssetType): Promise<Stock[]> {
    const response = await fetch(`${this.baseEnpoint}/quote/list?token=${this.apiKey}&type=${type}`);
    const data = await response.json();
    const assets = data[AssetTypeForBrapiFetch[type]];

    // save the stocks in the cache for 1 hour and return
    await this.cacheManager.set(type, assets, 3600);
    return assets
      .map((stock: any) => {
        switch (type) {
          case AssetType.STOCK:
            return new Stock(stock);
          default:
            return null;
        }
      })
      .filter(Boolean) as Stock[];
  }

  async showDetailedStock(ticker: string): Promise<DetailedStock> {
    const cachedDetailedStock = await this.cacheManager.get(`stock:${ticker}`);

    if (cachedDetailedStock) {
      return cachedDetailedStock as DetailedStock;
    }

    const response = await fetch(`${this.baseEnpoint}/quote/${ticker}?token=${this.apiKey}`);
    const data = await response.json();
    const result = data.results[0];
    const detailedStock = new DetailedStock(result);

    await this.cacheManager.set(`stock:${ticker}`, detailedStock, 3600);
    return detailedStock;
  }
}
