import React, { useEffect, useState } from "react";
import QualitiesList from "./qualitiesList";
import api from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then(data => setUser(data));
  }, []);

  const handleClick = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div className={"ms-2"}>
        <h1>{user?.name}</h1>
        <h3>Профессия: {user?.profession.name}</h3>
        <QualitiesList qualities={user?.qualities} />
        <p><span>Completed Meetings: {user?.completedMeetings}</span></p>
        <h2>Rate: {user?.rate}</h2>
        <button className={"btn btn-primary"} onClick={() => handleClick()}>All users</button>
      </div>
    );
  }
  return <span className={"fs-4 fw-bold ms-2"}>User Loading...</span>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
