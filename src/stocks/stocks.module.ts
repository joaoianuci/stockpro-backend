import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StocksController } from "./stocks.controller";
import { BrapiService } from "./brapi.service";
import { AuthMiddleware } from "src/auth/auth.middleware";
import { CacheModule } from "@nestjs/cache-manager";
import { Stock } from "./entities/stock.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockTypeORMRepository } from "./stock.repository";
import { ShowDetailedStockUseCase } from "./use-cases/show-detailed-stock.use-case";
import { ListStocksUseCase } from "./use-cases/list-stocks.use-case";
import { PDFModule } from "@t00nday/nestjs-pdf";
import { GenerateStockPDFUseCase } from "./use-cases/generate-detailed-stock-pdf.use.case";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PublishGeneratePdfMessage } from "./messages/pub/publish-generate-pdf.message";
import { SubscribeGeneratePdfMessage } from "./messages/sub/subscribe-generate-pdf.message";

const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "STOCK_PDF_SERVICE",
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
    CacheModule.register(),
    TypeOrmModule.forFeature([Stock]),
    PDFModule.register({
      view: {
        root: "./src/static/views",
        extension: "pug",
        engine: "pug",
      },
      isGlobal: true,
    }),
  ],
  controllers: [SubscribeGeneratePdfMessage, StocksController],
  providers: [
    BrapiService,
    StockTypeORMRepository,
    ShowDetailedStockUseCase,
    ListStocksUseCase,
    GenerateStockPDFUseCase,
    PublishGeneratePdfMessage,
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
