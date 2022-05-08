import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";

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
        <Qualities qualities={user?.qualities} />
        <p><span>Completed Meetings: {user?.completedMeetings}</span></p>
        <h2>Rate: {user?.rate}</h2>
        <Link to={`${userId}/edit`}><button className={"btn btn-secondary me-4"}>Edit Profile</button></Link>
        <button className={"btn btn-outline-primary"} onClick={() => handleClick()}>All users</button>
      </div>
    );
  }
  return <span className={"fs-4 fw-bold ms-2"}>User Loading...</span>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
