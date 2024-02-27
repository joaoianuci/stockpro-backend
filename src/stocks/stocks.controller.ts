import { Controller, Get, Inject } from "@nestjs/common";
import { BrapiService } from "./brapi.service";

@Controller("stocks")
export class StocksController {
  constructor(
    @Inject(BrapiService)
    private readonly brapiService: BrapiService,
  ) {}

  @Get()
  async listStocks() {
    return this.brapiService.listStocks();
  }
}
