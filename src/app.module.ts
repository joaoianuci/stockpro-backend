import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { StocksModule } from "./stocks/stocks.module";
import { TasksModule } from "./tasks/tasks.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./src/database/sqlite.db",
      synchronize: true,
      entities: [User],
    }),
    UsersModule,
    StocksModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
