import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";

import { config } from "dotenv";

config();

const isMasterInstance = process.env.INSTANCE_ID === "master";
const providers = isMasterInstance ? [TasksService] : [];

@Module({
  providers,
})
export class TasksModule {}
