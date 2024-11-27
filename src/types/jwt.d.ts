import { User } from "@prisma/client";

declare module "jose" {
  type UserPayload = Omit<User, "password">;
  export interface JWTPayload {
    user: UserPayload;
  }
}
