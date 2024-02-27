import { LoginUserDto } from "../dto/login-user.dto";
import { Inject } from "@nestjs/common";
import { IUserRepository } from "../user.repository";
import { User } from "../entities/user.entity";

export class LoginUserUseCase {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: LoginUserDto): Promise<User> {
    const user = await this.userRepo.findByEmail(input.email);
    if (user) {
      // need validate the expiration of the token if not expired just return the user
      const isExpired = user.isExpired();
      if (!isExpired) return user;

      // if expired refresh the token and return the user
      user.refreshToken(input.accessToken);
      await this.userRepo.update(user);
      return user;
    }
    // if user not found create a new user
    const newUser = new User(input);
    newUser.name = input.firstName + " " + input.lastName;
    newUser.refreshToken(input.accessToken);

    await this.userRepo.create(newUser);

    return newUser;
  }
}
