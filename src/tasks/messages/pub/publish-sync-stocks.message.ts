import { Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { randomUUID } from "crypto";

export class PublishSyncStocksMessage {
  private readonly logger = new Logger(PublishSyncStocksMessage.name);
  constructor(@Inject("STOCKS_SERVICE") private client: ClientProxy) {}

  async publish() {
    try {
      await this.client.connect();
      this.client.emit("stocks", randomUUID);
    } catch (error) {
      this.logger.error("Error while emitting event", error);
    }
  }
}
