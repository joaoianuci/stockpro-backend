import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StocksController } from "./stocks.controller";
import { BrapiService } from "./brapi.service";
import { AuthMiddleware } from "src/auth/auth.middleware";
import { CacheModule } from "@nestjs/cache-manager";
import { Stock } from "./entities/stock.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockTypeORMRepository } from "./stock.repository";

// add AuthMiddleware to the providers array
@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([Stock])],
  controllers: [StocksController],
  providers: [
    BrapiService,
    StockTypeORMRepository,
    {
      provide: "IStockRepository",
      useExisting: StockTypeORMRepository,
    },
  ],
})
export class StocksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("stocks");
  }
}
