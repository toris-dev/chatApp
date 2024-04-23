"use client";

import EmptyState from "@/components/EmptyState";
import useConversations from "@/hooks/useConversation";
import clsx from "clsx";

const ConversationsPage = () => {
  const { isOpen } = useConversations();
  return (
    <div
      className={clsx(`h-full lg:block lg:pl-80`, isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
