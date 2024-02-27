import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { GoogleStrategy } from "./google.strategy";
import { usersUseCases } from "./use-cases";
import { User } from "./entities/user.entity";
import { UserTypeORMRepository } from "./user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    ...usersUseCases,
    GoogleStrategy,
    UserTypeORMRepository,
    {
      provide: "IUserRepository",
      useExisting: UserTypeORMRepository,
    },
  ],
})
export class UsersModule {}
