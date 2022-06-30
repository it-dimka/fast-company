import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditForm from "../components/ui/editForm";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const Users = () => {
  const { userId, edit } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId
          ? (edit
            ? (userId === currentUserId
              ? (<EditForm/>)
              : (<Redirect to={{ pathname: `/users/${currentUserId}/edit` }}/>))
            : (<UserPage userId={userId}/>))
          : <UsersListPage/>}
      </UsersLoader>
    </>
  );
};

export default Users;
