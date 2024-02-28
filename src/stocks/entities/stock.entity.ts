import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Stock {
  @PrimaryColumn()
  stock: string;

  @Column()
  name: string;

  @Column()
  close: number;

  @Column()
  change: number;

  @Column()
  volume: number;

  @Column()
  market_cap: number;

  @Column()
  logo: string;

  @Column()
  sector: string;

  @Column()
  type: string;

  constructor(partial: Partial<Stock>) {
    Object.assign(this, partial);
  }

  isStock() {
    return this.type === "stock";
  }

  isBdr() {
    return this.type === "bdr";
  }
}
