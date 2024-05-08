import { Channel, Members } from "pusher-js";
import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";
import useActiveList from "./useActiveList";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      console.log("pusher:subscription_succeeded", members);

      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      console.log("pusher:member_added", member);
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      console.log("pusher:member_removed", member);

      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
