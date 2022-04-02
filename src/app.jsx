import React, {useState} from "react";
import UsersList from "./components/usersList";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(user => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const index = users.findIndex(user => user._id === id)
    const updateUsers = [...users]
    updateUsers[index].bookmark = !updateUsers[index].bookmark
    setUsers(updateUsers)
  }

  return <UsersList users={users} onToggleBookMark={handleToggleBookMark} onDelete={handleDelete}/>;
};

export default App;
