import React, { useEffect, useState } from "react";
import UsersList from "./components/usersList";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

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
    users
      ? <UsersList
        users={users}
        onToggleBookMark={handleToggleBookMark}
        onDelete={handleDelete}/>
      : <span className={"fs-4 fw-bold"}>IsLoading...</span>
  );
};

export default App;
