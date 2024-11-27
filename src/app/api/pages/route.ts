import PageService from "@/services/pages-service";
import { getUser } from "@/utils/jwt-token-control";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUser(req);

  const pageService = new PageService();

  const pages = await pageService.findAll({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(pages, { status: 200 });
}

export async function POST(req: NextRequest) {
  const user = await getUser(req);

  const pageService = new PageService();

  const pages = await pageService.create({
    data: {
      userId: user.id,
      title: `New page - ${format(new Date(), "yyyy/MM/dd")}`, // Formatação correta
    },
  });

  return NextResponse.json(pages, { status: 200 });
}
