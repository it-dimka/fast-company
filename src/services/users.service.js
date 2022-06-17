import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const usersEndpoint = "users/";

const usersService = {
  fetchAll: async () => {
    const { data } = await httpService.get(usersEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(usersEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(usersEndpoint + localStorageService.getUserId());
    return data;
  },
  updateUserData: async (payload) => {
    const { data } = await httpService.put(usersEndpoint + payload._id, payload);
    return data;
  }
};

export default usersService;
