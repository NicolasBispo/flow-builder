import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth-middleware";

// Defina as rotas privadas
const protectedRoutes = ["/api/pages", "/api/pages/components", "/dashboard"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Verifica se a rota é protegida
  console.log("url ===>", url);
  const isProtected = protectedRoutes.includes(url.pathname);

  console.log("is protected", isProtected);

  if (isProtected) {
    // Executa o `authMiddleware`
    const authResult = await authMiddleware(req);

    // Se o `authMiddleware` retornar uma resposta, bloqueia o acesso
    if (authResult) {
      return authResult;
    }
  }

  // Permite continuar para rotas não protegidas
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/:path*"],
};
