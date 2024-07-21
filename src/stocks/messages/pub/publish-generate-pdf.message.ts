import { Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { DetailedStock } from "src/stocks/entities/detailed-stock.entity";

export class PublishGeneratePdfMessage {
  private readonly logger = new Logger(PublishGeneratePdfMessage.name);
  constructor(@Inject("STOCK_PDF_SERVICE") private client: ClientProxy) {}

  async publish(stock: DetailedStock) {
    try {
      await this.client.connect();
      this.client.emit("pdf", stock);
    } catch (error) {
      this.logger.error("Error while emitting event", error);
    }
  }
}
