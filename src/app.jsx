import React, {useState} from "react";
import UsersList from "./components/usersList";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(user => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(users.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark
      }
      return user
    }))
  };

  return <UsersList users={users} onToggleBookMark={handleToggleBookMark} onDelete={handleDelete}/>;
};

export default App;
