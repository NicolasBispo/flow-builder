import { SECRET } from "@/config/constants";
import { UnauthorizedException } from "@/exceptions/unauthorized";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(SECRET), // Verifique se SECRET está corretamente configurado
};

// Função para gerar o token
if (!SECRET) throw new Error("Missing SECRET ENV FILE");
export const generateToken = async (user: User) => {
  const user_payload = { ...user, password: undefined };
  const encripted = await new SignJWT({
    user: { ...user_payload },
  })
    .setProtectedHeader({ alg: "HS256" }) // Altere para algo como HS256 para assinar
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(jwtConfig.secret); // Aqui você usaria .sign() em vez de .encrypt()
  return encripted;
};

// Função para verificar o token
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, jwtConfig.secret);
    const { user } = payload;
    return user;
  } catch (error) {
    console.error("Error ===>", error);
    return null; // O token é inválido ou expirou
  }
};

export const getUser = async (req: NextRequest) => {
  const token = req.headers.get("Authorization");
  console.log("token aqui", token);
  if (!token) throw new UnauthorizedException();

  // Remover o prefixo "Bearer " do token
  const tokenWithoutBearer = token.replace("Bearer ", "").trim();

  const user = await verifyToken(tokenWithoutBearer);
  if (!user) throw new UnauthorizedException();

  return user;
};
