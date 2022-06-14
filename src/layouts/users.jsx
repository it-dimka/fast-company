import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUser";
import EditForm from "../components/ui/editForm";

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <>
      <UserProvider>
        {userId
          ? (edit
            ? (<EditForm />)
            : (<UserPage userId={userId} />))
          : <UsersListPage />}
      </UserProvider>
    </>
  );
};

export default Users;
