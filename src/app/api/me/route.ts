import { getUser } from "@/utils/jwt-token-control";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  return Response.json(user, {
    status: 200,
  });
}
