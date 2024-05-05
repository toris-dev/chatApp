"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

type AvatarGroupType = {
  users?: User[];
};
const AvatarGroup: FC<AvatarGroupType> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative size-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block size-[21px] overflow-hidden rounded-full ${
            positionMap[index as keyof typeof positionMap]
          } `}
        >
          <Image
            fill
            src={user?.image || "/image/placeholder.png"}
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
