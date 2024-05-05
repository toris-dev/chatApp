"use client";

import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";

type DesktopSidebarProps = {
  currentUser: User;
};
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className={`hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-DEFAULT lg:bg-orange-400 lg:pb-4 xl:px-6`}
      >
        <nav className={`mt-4 flex flex-col justify-between`}>
          <ul className={`flex flex-col items-center space-y-1`}>
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className={`mt-4 flex flex-col items-center justify-between`}>
          <div
            className={`cursor-pointer transition hover:opacity-75`}
            onClick={() => setIsOpen(true)}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
