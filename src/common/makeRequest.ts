import axios from "axios";
import { RequestMethod } from "src/types/RequestMethod";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtAccess");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => Promise.reject(error)
);

export const makeRequest = async ({
  url,
  method = RequestMethod.GET,
  params,
  body,
  headers,
}: {
  url: string;
  method?: RequestMethod;
  params?: any;
  body?: any;
  headers?: any;
}) => {
  if (method === RequestMethod.GET) {
    try {
      const { data } = await axios.get(url, { params, headers });

      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;
      return [null, error.response?.data];
    }
  } else if (method === RequestMethod.POST) {
    try {
      const { data } = await axios.post(url, body, { headers, method });
      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;

      return [null, error.response?.data];
    }
  } else {
    try {
      const { data } = await axios.delete(url);
      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;

      return [null, error.response?.data];
    }
  }
};
