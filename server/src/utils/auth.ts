import { sign } from "jsonwebtoken";
import { User } from "src/user/user.entity";

export const createAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.SECRET_ACCESS,
    { expiresIn: "15s" }
  );
};
export const createRefreshToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.SECRET_REFRESH,
    { expiresIn: "30d" }
  );
};
