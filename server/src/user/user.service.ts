import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { createAccessToken, createRefreshToken } from "src/utils/auth";
import { sendRefreshToken } from "src/utils/sendRefreshToken";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async me(req) {
    return await this.userRepository.findOne({ where: { id: req.userId } });
  }

  async register(req, res: Response, dto: UserDto) {
    const hashedPass = await hash(dto.password, 12);
    try {
      const user = await this.userRepository.create({
        email: dto.email,
        password: hashedPass,
      });
      await this.userRepository.save(user);
      req.userId = user.id;
      await sendRefreshToken(res, createRefreshToken(user));
      return res.json({
        user,
        accessToken: createAccessToken(user),
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async login(req, res: Response, dto: UserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException("could not find user");
    }
    const valid = await compare(dto.password, user.password);
    if (!valid) {
      throw new BadRequestException("bad password");
    }

    req.userId = user.id;
    await sendRefreshToken(res, createRefreshToken(user));
    return res.json({
      user,
      accessToken: createAccessToken(user),
    });
  }
  async logout(res) {
    res.clearCookie("jid");
    return res.json(true);
  }
}
