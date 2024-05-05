import prisma from "@/libs/prismadb";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await hash(password as string, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
