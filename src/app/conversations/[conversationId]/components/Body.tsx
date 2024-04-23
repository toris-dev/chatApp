"use client";

import { Message } from "@prisma/client";
import { FC } from "react";

type BodyProps = {
  initialMessages: Message[];
};

const Body: FC<BodyProps> = ({ initialMessages }) => {
  return <div>Body</div>;
};

export default Body;
