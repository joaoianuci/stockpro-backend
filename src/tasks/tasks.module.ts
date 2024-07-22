import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";

import { config } from "dotenv";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "src/stocks/entities/stock.entity";
import { StockTypeORMRepository } from "src/stocks/stock.repository";
import { CacheModule } from "@nestjs/cache-manager";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TasksController } from "./tasks.controller";
import { SubscribeSyncStocksMessage } from "./messages/sub/subscribe-sync-stocks.message";
import { PublishSyncStocksMessage } from "./messages/pub/publish-sync-stocks.message";
import { StocksModule } from "src/stocks/stocks.module";

config();

const isMasterInstance = process.env.INSTANCE_ID === "master";
const taskProvider = isMasterInstance ? [TasksService] : [];
const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Stock]),
    ClientsModule.register([
      {
        name: "STOCKS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMQUrl],
          queue: "stocks",
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    StocksModule,
  ],
  providers: [
    ...taskProvider,
    PublishSyncStocksMessage,
    {
      provide: "IStockRepository",
      useExisting: StockTypeORMRepository,
    },
  ],
  controllers: [SubscribeSyncStocksMessage, TasksController],
})
export class TasksModule {}
