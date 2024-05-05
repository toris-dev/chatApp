import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

type TParms = {
  conversationId?: string;
};
export async function DELETE(request: Request, { params }: { params: TParms }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json(null);
    }
    const existringConversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existringConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prisma?.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existringConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existringConversation
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}
