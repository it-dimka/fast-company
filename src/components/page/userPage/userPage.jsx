import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUser";
import CommentsProvider from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user}/>
            <QualitiesCard data={user?.qualities}/>
            <MeetingsCard value={user?.completedMeetings}/>
          </div>
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
    );
  }
  return <span className={"fs-4 fw-bold ms-2"}>User Loading...</span>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
