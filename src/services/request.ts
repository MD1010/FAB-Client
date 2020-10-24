import axios, { AxiosError } from "axios";
import { toLength } from "lodash";
import { trackPromise } from "react-promise-tracker";
import { RequestMethod } from "src/types/RequestMethod";
import { setNewAccessTokenIfExpired } from "./jwt";

export const httpClient = axios.create();
const token = localStorage.getItem("access_token");
if (token) httpClient.defaults.headers["Authorization"] = "Bearer " + token;
httpClient.defaults.timeout = 5000;
httpClient.defaults.withCredentials = true;

httpClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.data.message === "Token has expired") {
      console.log("Token expired");
      setNewAccessTokenIfExpired();
    }
    return Promise.reject(error);
  }
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
