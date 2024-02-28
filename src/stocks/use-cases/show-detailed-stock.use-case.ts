import { Inject } from "@nestjs/common";
import { Stock } from "../entities/stock.entity";
import { IStockRepository } from "../stock.repository";
import { BrapiService } from "../brapi.service";
import { DetailedStock } from "../entities/detailed-stock.entity";

export class ShowDetailedStockUseCase {
  @Inject("IStockRepository")
  private readonly stockRepository: IStockRepository;
  @Inject(BrapiService)
  private readonly brapiService: BrapiService;

  constructor() {}

  async execute(stock: string): Promise<DetailedStock> {
    const stockEntity = await this.stockRepository.findByTicker(stock);

    if (stockEntity) {
      return this.brapiService.showDetailedStock(stock);
    }

    throw new Error("Stock not found");
  }
}
