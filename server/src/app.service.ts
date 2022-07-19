import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { verify } from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "./user/user.entity";
import { createAccessToken, createRefreshToken } from "./utils/auth";
import { sendRefreshToken } from "./utils/sendRefreshToken";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  getHello(): string {
    return "Hello World!";
  }
  async refreshToken(token, res) {
    if (!token) {
      throw new UnauthorizedException("UnauthorizedException");
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.SECRET_REFRESH);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException("UnauthorizedException");
    }
    const user = await this.userRepository.findOne({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException("UnauthorizedException");
    }
    sendRefreshToken(res, createRefreshToken(user));

    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
