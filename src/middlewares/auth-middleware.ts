import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt-token-control";

function sendToLogin(req: NextRequest) {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/login";
  return NextResponse.redirect(redirectUrl);
}

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token");
  console.log("token aqui ===>", token);
  if (!token || !token.value) {
    return sendToLogin(req);
  }
  const tokenPayload = await verifyToken(token.value);
  console.log("token payload", tokenPayload);
  if (!tokenPayload) {
    return sendToLogin(req);
  }

  return null;
}


