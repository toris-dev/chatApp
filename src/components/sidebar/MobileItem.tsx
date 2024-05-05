"use client";

import Link from "next/link";
import { IconType } from "react-icons/lib";

type MobileItemProps = {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={`group flex w-full justify-center gap-x-3 p-4 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black`}
    >
      <Icon className="size-6" />
    </Link>
  );
};

export default MobileItem;
