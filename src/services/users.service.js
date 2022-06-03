import httpService from "./http.service";

const usersEndpoint = "user/";

const usersService = {
  fetchAll: async () => {
    const { data } = await httpService.get(usersEndpoint);
    return data;
  }
};

export default usersService;
