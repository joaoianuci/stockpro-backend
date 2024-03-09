import { Inject } from "@nestjs/common";
import { IStockRepository } from "../stock.repository";
import { BrapiService } from "../brapi.service";

export class ShowAnalysisStockUseCase {
  constructor(
    @Inject("IStockRepository")
    private readonly stockRepo: IStockRepository,
    @Inject(BrapiService)
    private readonly brapiService: BrapiService,
  ) {}
}
