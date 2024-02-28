import { Repository } from "typeorm";
import { Stock } from "./entities/stock.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

export interface IStockRepository {
  save(stocks: Stock[]): Promise<void>;
  findAll(): Promise<Stock[]>;
  findByTicker(ticker: string): Promise<Stock>;
  findByType(type: string): Promise<Stock[]>;
  findBySector(sector: string): Promise<Stock[]>;
}

@Injectable()
export class StockTypeORMRepository implements IStockRepository {
  constructor(
    @InjectRepository(Stock)
    private typeOrmRepo: Repository<Stock>,
  ) {}

  async save(stocks: Stock[]): Promise<void> {
    await this.typeOrmRepo.save(stocks);
  }

  findAll(): Promise<Stock[]> {
    return this.typeOrmRepo.find();
  }

  findByTicker(ticker: string): Promise<Stock> {
    return this.typeOrmRepo.findOne({
      where: { stock: ticker },
    });
  }

  findByType(type: string): Promise<Stock[]> {
    return this.typeOrmRepo.find({
      where: { type },
    });
  }

  findBySector(sector: string): Promise<Stock[]> {
    return this.typeOrmRepo.find({
      where: { sector },
    });
  }
}
