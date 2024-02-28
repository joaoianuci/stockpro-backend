import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SyncStocksUseCase } from "src/stocks/use-cases/sync-stocks.use-case";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Inject(SyncStocksUseCase)
  private readonly syncStocksUseCase: SyncStocksUseCase;

  constructor() {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      this.logger.debug("Synchronizing stocks...");
      await this.syncStocksUseCase.execute();
      this.logger.debug("Stocks synchronized!");
    } catch (error) {
      this.logger.error("Error while synchronizing stocks", error);
    }
  }
}
