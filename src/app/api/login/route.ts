import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/jwt-token-control";
import { NextRequest, NextResponse } from "next/server";
import UserService from "@/services/user-service";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { email, password } = data;

  const userService = new UserService();
  const user = await userService.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  // Verifique se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });
  }

  // Gere o JWT
  const token = await generateToken(user);

  (await cookies()).set("token", token);

  return Response.json(
    { ...user, password: undefined },
    {
      status: 200,
      headers: {
        Authorization: token,
      },
    }
  );
}
