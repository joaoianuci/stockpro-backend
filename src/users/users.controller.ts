import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginUserDto } from "./dto/login-user.dto";
import { LoginUserUseCase } from "./use-cases";

@Controller("google")
export class UsersController {
  @Inject(LoginUserUseCase)
  private readonly loginUserUseCase: LoginUserUseCase;

  constructor() {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: any) {
    const user: LoginUserDto = req.user;
    return this.loginUserUseCase.execute(user);
  }
}
