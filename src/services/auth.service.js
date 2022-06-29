import axios from "axios";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const url = "accounts:signUp";

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
    return data;
  }
};

export default authService;
