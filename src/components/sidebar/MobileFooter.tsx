"use client";

import useConversations from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversations();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 z-40 flex w-full items-center justify-between border-t-DEFAULT bg-white lg:hidden`}
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
