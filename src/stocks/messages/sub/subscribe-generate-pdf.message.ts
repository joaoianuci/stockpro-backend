import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GenerateStockPDFUseCase } from "src/stocks/use-cases/generate-detailed-stock-pdf.use.case";

@Controller("pdf")
export class SubscribeGeneratePdfMessage {
  constructor(public readonly generateStockPDFUseCase: GenerateStockPDFUseCase) {}

  @MessagePattern("pdf")
  public subscribe(@Payload() data): void {
    try {
      this.generateStockPDFUseCase.execute(data);
    } catch (error) {
      console.error("Error while generating stock PDF", error);
    }
  }
}
