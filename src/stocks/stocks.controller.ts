import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ShowDetailedStockUseCase } from "./use-cases/show-detailed-stock.use-case";
import { ListStocksUseCase } from "./use-cases/list-stocks.use-case";

@Controller("stocks")
export class StocksController {
  @Inject(ShowDetailedStockUseCase)
  private readonly showDetailedStockUseCase: ShowDetailedStockUseCase;
  @Inject(ListStocksUseCase)
  private readonly listStocksUseCase: ListStocksUseCase;

  constructor() {}

  @Get()
  async listStocks() {
    return this.listStocksUseCase.execute();
  }

  @Get(":ticker")
  async showDetailedStock(@Param("ticker") ticker: string) {
    return this.showDetailedStockUseCase.execute(ticker);
  }
}
