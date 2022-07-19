import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserDto } from "./user.dto";
import { AuthGuard } from "./user.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get()
  async me(@Req() req) {
    return this.userService.me(req);
  }
  @Post("register")
  async register(@Req() req, @Res() res, @Body() dto: UserDto) {
    return this.userService.register(req, res, dto);
  }
  @Post("login")
  async login(@Req() req, @Res() res, @Body() dto: UserDto) {
    return this.userService.login(req, res, dto);
  }
  @Post("logout")
  async logout(@Res() res) {
    return this.userService.logout(res);
  }
}
