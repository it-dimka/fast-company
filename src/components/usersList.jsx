import React from "react";
import User from "./user";
import SearchStatus from "./searchStatus";

const UsersList = ({ users, ...rest }) => {
  return (
      <>
        <SearchStatus length={users.length} />
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
              <User key={user._id} {...user} onToggleBookMark={rest.onToggleBookMark} onDelete={rest.onDelete} />
          ))}
          </tbody>
        </table>
      </>
  );
};

export default UsersList;
