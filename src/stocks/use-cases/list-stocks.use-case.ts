import { Inject } from "@nestjs/common";
import { Stock } from "../entities/stock.entity";
import { IStockRepository } from "../stock.repository";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { AssetType } from "src/types/assets.types";

export class ListStocksUseCase {
  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;
  @Inject("IStockRepository")
  private readonly stockRepository: IStockRepository;
  constructor() {}

  async execute(): Promise<Stock[]> {
    const cachedStocks = await this.cacheManager.get(AssetType.STOCK);
    if (cachedStocks) {
      return cachedStocks as Stock[];
    }

    const stocks = await this.stockRepository.findByType(AssetType.STOCK);
    await this.cacheManager.set(AssetType.STOCK, stocks, 3600);
    return stocks;
  }
}
