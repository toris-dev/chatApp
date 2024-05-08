"use client";

import GroupChatModal from "@/components/modals/GroupChatModal";
import useConversations from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
type ConversationListProps = {
  initialItems: FullConversationType[];
  users: User[];
  title: string;
};

const ConversationList: FC<ConversationListProps> = ({
  initialItems,
  users,
  title,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { conversationId, isOpen } = useConversations();
  const session = useSession();
  const pusherKey = session.data?.user?.email;

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };
    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((item) => item.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey]);
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <aside
        className={clsx(
          `fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0`,
          isOpen ? "hidden" : "left-0 block w-full"
        )}
      >
        <div className="px-5 ">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">채팅 앱</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              data={item}
              key={item.id}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
