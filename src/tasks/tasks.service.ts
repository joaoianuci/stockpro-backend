import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";
import { randomUUID } from "crypto";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@Inject("STOCKS_SERVICE") private client: ClientProxy) {}

  // execute this method one time and then every hour
  async onApplicationBootstrap() {
    try {
      this.logger.debug("Synchronizing stocks...");
      await this.emitSyncStocksEvent();
      this.logger.debug("Stocks synchronized!");
    } catch (error) {
      this.logger.error("Error while synchronizing stocks", error);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      this.logger.debug("Synchronizing stocks...");
      await this.emitSyncStocksEvent();
      this.logger.debug("Stocks synchronized!");
    } catch (error) {
      this.logger.error("Error while synchronizing stocks", error);
    }
  }

  private async emitSyncStocksEvent() {
    try {
      await this.client.connect();
      this.client.emit("stocks", randomUUID());
    } catch (error) {
      this.logger.error("Error while emitting event", error);
    }
  }
}
