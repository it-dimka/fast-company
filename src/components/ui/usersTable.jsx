import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Table from "../common/table";
import Qualities from "./qualities";
import Profession from "./profession";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (users) => (
        <Qualities data={users.qualities} />
      )
    },
    profession: { name: "Профессия", component: (user) => <Profession id={user.profession}/> },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          onToggleBookMark={onToggleBookMark}
          id={user._id} status={user.bookmark} />
      )
    }
  };

  return (
    <Table onSort={onSort} columns={columns} data={users} selectedSort={selectedSort} />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
};

export default UsersTable;
