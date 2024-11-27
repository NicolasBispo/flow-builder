import { LoginSchema } from "@/schemas/login.schema";
import UserService from "@/services/user-service";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { SALTS } from "@/config/constants";
export async function POST(req: Request) {
  const data: LoginSchema = await req.json();
  const { email, password } = data;
  const userService = new UserService();

  const user = await userService.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      {
        error: "Email already in use",
      },
      { status: 400 }
    );
  }

  try {
    const hashPassword = await hash(password, SALTS);
    const createdUser = await userService.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json(
      {
        ...createdUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
