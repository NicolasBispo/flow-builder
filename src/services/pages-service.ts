import { Prisma, PrismaClient } from "@prisma/client";

export default class PageService {
  private prisma = new PrismaClient();

  async findAll(args: Prisma.PageFindManyArgs) {
    return await this.prisma.page.findMany(args);
  }

  async findOne(args: Prisma.PageFindUniqueArgs) {
    return await this.prisma.page.findUnique(args);
  }

  async create(args: Prisma.PageCreateArgs) {
    return await this.prisma.page.create(args);
  }

  async update(args: Prisma.PageUpdateArgs) {
    return await this.prisma.page.update(args);
  }
  async delete(args: Prisma.PageDeleteArgs) {
    return await this.prisma.page.delete(args);
  }
}
