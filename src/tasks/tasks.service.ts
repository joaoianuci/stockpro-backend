import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PublishSyncStocksMessage } from "./messages/pub/publish-sync-stocks.message";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@Inject(PublishSyncStocksMessage) private publishSyncStocksMessage: PublishSyncStocksMessage) {}

  // execute this method one time and then every hour
  async onApplicationBootstrap() {
    try {
      await this.publishSyncStocksMessage.publish();
    } catch (error) {
      this.logger.error("Error while synchronizing stocks", error);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      await this.publishSyncStocksMessage.publish();
    } catch (error) {
      this.logger.error("Error while synchronizing stocks", error);
    }
  }
}
