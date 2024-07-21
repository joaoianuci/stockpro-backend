import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SyncStocksUseCase } from "src/stocks/use-cases/sync-stocks.use-case";

@Controller("sync-stocks")
export class SubscribeSyncStocksMessage {
  constructor(private readonly syncStocksUseCase: SyncStocksUseCase) {}

  @MessagePattern("stocks")
  public syncStocksPattern(@Payload() data): void {
    try {
      this.syncStocksUseCase.execute();
    } catch (error) {
      console.error("Error while synchronizing stocks", error);
    }
  }
}
