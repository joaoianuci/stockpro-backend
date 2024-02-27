import { randomUUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string = randomUUID();

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  accessToken: string;

  @Column()
  picture: string;

  @Column()
  expiresIn: number;


  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  isExpired() {
    return Date.now() >= this.expiresIn;
  }

  refreshToken(accessToken: string) {
    this.expiresIn = Date.now() + 86400 * 1000;
    this.accessToken = accessToken;
  }
}
