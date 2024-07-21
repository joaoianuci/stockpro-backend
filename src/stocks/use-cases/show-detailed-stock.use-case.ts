import { BadRequestException, Inject, Logger } from "@nestjs/common";
import { IStockRepository } from "../stock.repository";
import { BrapiService } from "../brapi.service";
import { DetailedStock } from "../entities/detailed-stock.entity";
import { PublishGeneratePdfMessage } from "../messages/pub/publish-generate-pdf.message";

export class ShowDetailedStockUseCase {
  @Inject("IStockRepository")
  private readonly stockRepository: IStockRepository;

  @Inject(BrapiService)
  private readonly brapiService: BrapiService;

  @Inject(PublishGeneratePdfMessage)
  private readonly publishGeneratePdfMessage: PublishGeneratePdfMessage;

  async execute(stock: string): Promise<DetailedStock> {
    const stockEntity = await this.stockRepository.findByTicker(stock);

    if (!stockEntity) {
      throw new BadRequestException("Stock not found");
    }

    const detailedStock = await this.brapiService.showDetailedStock(stock);
    const stockToShow = {
      ...stockEntity,
      ...detailedStock,
    } as DetailedStock;

    // create file with stock details
    await this.publishGeneratePdfMessage.publish(stockToShow);

    return stockToShow;
  }
}
