import { NextResponse } from "next/server";

export class UnauthorizedException extends Error {
  constructor() {
    super();
    NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}
