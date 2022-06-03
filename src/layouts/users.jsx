import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
  const { userId } = useParams();

  return (
    <>
      <UserProvider>
        {userId ? <UserPage userId={userId} /> : <UsersListPage />}
      </UserProvider>
    </>
  );
};

export default Users;
