import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Table from "../common/table";
import Qualities from "./qualities";

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (users) => (
        <Qualities qualities={users.qualities} />
      )
    },
    profession: { path: "profession.name", name: "Профессия" },
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
    },
    delete: {
      component: (user) => (
        <button type="button" className="btn btn-danger btn-sm"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
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
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
