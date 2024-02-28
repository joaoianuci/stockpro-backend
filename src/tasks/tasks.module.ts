import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";

import { config } from "dotenv";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "src/stocks/entities/stock.entity";
import { BrapiService } from "src/stocks/brapi.service";
import { StockTypeORMRepository } from "src/stocks/stock.repository";
import { CacheModule } from "@nestjs/cache-manager";
import { SyncStocksUseCase } from "src/stocks/use-cases/sync-stocks.use-case";

config();

const isMasterInstance = process.env.INSTANCE_ID === "master";
const taskProvider = isMasterInstance ? [TasksService] : [];

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([Stock])],
  providers: [
    ...taskProvider,
    BrapiService,
    StockTypeORMRepository,
    SyncStocksUseCase,
    {
      provide: "IStockRepository",
      useExisting: StockTypeORMRepository,
    },
  ],
})
export class TasksModule {}
