import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditForm from "../components/ui/editForm";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  if (!dataStatus) return "Loading...";

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
