import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as connectRedis from "connect-redis";
import * as session from "express-session";
import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = connectRedis(session);
  // const redis = new Redis(process.env.REDIS_URL);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
      name: "jid",
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10years
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
