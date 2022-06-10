import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import usersService from "../services/users.service";
import { toast } from "react-toastify";
import { setToken } from "../services/localStorage.service";

const httpAuth = axios.create();

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setToken(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "Пользователь с таким email уже существует" };
          throw errorObject;
        }
      }
    }
  }

  async function login({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      setToken(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "INVALID_PASSWORD") {
          const errorObject = { password: "Неверный пароль" };
          throw errorObject;
        }
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = { email: "Такой email не зарегистрирован" };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await usersService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

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
    <AuthContext.Provider value={{ currentUser, signUp, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
