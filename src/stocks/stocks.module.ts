import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StocksController } from "./stocks.controller";
import { BrapiService } from "./brapi.service";
import { AuthMiddleware } from "src/auth/auth.middleware";
import { CacheModule } from "@nestjs/cache-manager";

// add AuthMiddleware to the providers array
@Module({
  controllers: [StocksController],
  providers: [BrapiService],
  imports: [CacheModule.register()],
})
export class StocksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("stocks");
  }
}
