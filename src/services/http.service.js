import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data ? Object.values(data) : [];
}

axios.interceptors.response.use(
  function (response) {
    if (configFile.isFirebase) {
      response.data = { content: transformData(response.data) };
    }
    return response;
  }, function (error) {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
      console.log(error);
      toast.error("Something was wrong. Try it latter");
    }
    return Promise.reject(error);
  });

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;