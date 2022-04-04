import React, { useState } from "react";
import UsersList from "./components/usersList";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark;
        }
        return user;
      })
    );
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <UsersList
        users={users}
        onToggleBookMark={handleToggleBookMark}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
