import { BrapiService } from "../brapi.service";
import { IStockRepository } from "../stock.repository";
import { Inject } from "@nestjs/common";

export class SyncStocksUseCase {
  @Inject(BrapiService)
  private readonly brapiService: BrapiService;

  @Inject("IStockRepository")
  private readonly stockRepository: IStockRepository;

  constructor() {}

  async execute(): Promise<void> {
    const stocksFromApi = await this.brapiService.listStocks();
    await this.stockRepository.save(stocksFromApi);
  }
}
