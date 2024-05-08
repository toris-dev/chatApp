import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";

const getSession = async () => {
  return await getServerSession(authOptions);
};
export default getSession;
