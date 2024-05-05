import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    console.log(body);
    const { name, image } = body;
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
