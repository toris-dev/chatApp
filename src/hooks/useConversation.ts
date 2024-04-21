"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversations = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }
    return params.conversationId;
  }, [params?.conversationId]);

  const isOpen = !!conversationId;

  return { conversationId, isOpen };
};

export default useConversations;
