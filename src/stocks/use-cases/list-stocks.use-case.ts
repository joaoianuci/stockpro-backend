import { Inject } from "@nestjs/common";
import { Stock } from "../entities/stock.entity";
import { IStockRepository } from "../stock.repository";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

export class ListStocksUseCase {
  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;
  private readonly stockRepository: IStockRepository;
  constructor() {}

  async execute(): Promise<Stock[]> {
    const cachedStocks = await this.cacheManager.get("stock");
    if (cachedStocks) {
      return cachedStocks as Stock[];
    }
    // return this.stockRepository.findByType("stock");

    const stocks = await this.stockRepository.findByType("stock");
    await this.cacheManager.set("stock", stocks, 3600);
    return stocks;
  }
}
