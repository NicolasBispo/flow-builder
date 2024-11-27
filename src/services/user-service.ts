import { Prisma, PrismaClient } from "@prisma/client";

export default class UserService {
  private prisma = new PrismaClient();

  async findAll(args: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany(args);
  }

  async findOne(args: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(args);
  }

  async create(args: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(args);
  }

  async update(args: Prisma.UserUpdateArgs) {
    return await this.prisma.user.update(args);
  }
  async delete(args: Prisma.UserDeleteArgs) {
    return await this.prisma.user.delete(args);
  }
}
