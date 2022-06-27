import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import usersService from "../services/users.service";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = users.findIndex(u => u._id === currentUser._id);
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { content } = await usersService.fetchAll();
        setUsers(content);
        setLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    };
    getUsers();
  }, []);

  const getUserById = (id) => {
    return users.find(user => user._id === id);
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : <h1>Users Loading...</h1>}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
