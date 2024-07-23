import { PDFService } from "@t00nday/nestjs-pdf";
import { DetailedStock } from "../entities/detailed-stock.entity";
import { Inject, Logger } from "@nestjs/common";

export class GenerateStockPDFUseCase {
  @Inject(PDFService)
  private readonly pdfService: PDFService;

  private readonly logger = new Logger(GenerateStockPDFUseCase.name);

  execute(stock: DetailedStock) {
    try {
      if (!stock.symbol) {
        throw new Error("Stock symbol is required");
      }

      const formattedStock = this.resetNullishValues(stock);
      const filename = `${formattedStock.symbol}.pdf`;
      const marketValue = formattedStock.marketCap || formattedStock.market_cap;
      const marketCapInBillions = (marketValue / 1_000_000_000).toFixed(2) + "bi";
      this.pdfService
        .toFile("", `./src/static/documents/stocks/${filename}`, {
          locals: {
            ...formattedStock,
            lastUpdated: new Date().toLocaleDateString(),
            price: formattedStock.regularMarketPrice?.toFixed(2) ?? "N/A",
            priceEarnings: formattedStock.priceEarnings?.toFixed(2) ?? "N/A",
            marketCap: marketCapInBillions,
            earningsPerShare: formattedStock.earningsPerShare.toFixed(2) ?? "N/A",
          },
        })
        .subscribe();
    } catch (error) {
      this.logger.error(`Error while generating stock PDF ${stock.symbol}`, error);
    }
  }

  private resetNullishValues(stock: DetailedStock) {
    Object.keys(stock).forEach(key => {
      if (stock[key] === null || stock[key] === undefined) {
        stock[key] = 0;
      }
    });

    return stock;
  }
}
