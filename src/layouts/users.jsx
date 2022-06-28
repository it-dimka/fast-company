import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditForm from "../components/ui/editForm";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();

  return (
    <>
      {userId
        ? (edit
          ? (userId === currentUser._id
            ? (<EditForm/>)
            : (<Redirect to={{ pathname: `/users/${currentUser._id}/edit` }} />))
          : (<UserPage userId={userId} />))
        : <UsersListPage />}
    </>
  );
};

export default Users;
