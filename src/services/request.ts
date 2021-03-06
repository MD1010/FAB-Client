import axios, { AxiosError } from "axios";
import { toLength } from "lodash";
import { trackPromise } from "react-promise-tracker";
import { RequestMethod } from "src/types/RequestMethod";
import { getToken, setNewAccessTokenIfExpired, TokenType } from "./jwt";

export const httpClient = axios.create();

httpClient.defaults.timeout = 5000;

const interceptor = httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    let requestConfig = error.config;
    if (error.response?.data.msg === "Token has expired") {
      axios.interceptors.response.eject(interceptor);
      await setNewAccessTokenIfExpired();
      requestConfig.headers = httpClient.defaults.headers;
      return axios(requestConfig);
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
