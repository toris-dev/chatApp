import Sidebar from "@/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
      </div>
    </Sidebar>
  );
};

export default UserLayout;
