import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { RequestMethod } from "src/types/RequestMethod";
import { getNewAccessTokenIfExpired } from "./jwt";

const httpClient = axios.create();
httpClient.defaults.timeout = 5000;
httpClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");
    console.log("token", token);

    // token = await getNewAccessTokenIfExpired(token);
    if (token) config.headers["Authorization"] = "Bearer " + token;
    console.log("returning config");

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
      const { data } = await trackPromise(
        httpClient.get(url, { params, headers })
      );

      return [data, null];
    } catch (error) {
      return [null, error.response?.data || error.message];
    }
  } else if (method === RequestMethod.POST) {
    try {
      const { data } = await trackPromise(
        httpClient.post(url, body, { headers, method })
      );
      return [data, null];
    } catch (error) {
      return [null, error.response?.data || error.message];
    }
  } else {
    try {
      const { data } = await trackPromise(httpClient.delete(url));
      return [data, null];
    } catch (error) {
      return [null, error.response?.data || error.message];
    }
  }
};
