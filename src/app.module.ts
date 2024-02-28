import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { StocksModule } from "./stocks/stocks.module";
import { TasksModule } from "./tasks/tasks.module";
import { ScheduleModule } from "@nestjs/schedule";
import { Stock } from "./stocks/entities/stock.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./src/database/sqlite.db",
      synchronize: true,
      entities: [User, Stock],
    }),
    UsersModule,
    StocksModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
