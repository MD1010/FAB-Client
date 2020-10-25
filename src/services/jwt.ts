import axios from "axios";
import jwtDecode from "jwt-decode";
import { REFRESH_TOKEN } from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { getLoggedInUser } from "./auth";
import { httpClient, makeRequest } from "./request";

export const isAccessTokenExpired = (): boolean => {
  let token = localStorage.getItem("access_token");
  if (!token) return false;
  return jwtDecode(token).exp <= Date.now() / 1000;
};
export const getTokenIdentity = (token: string | null): boolean => {
  return token ? jwtDecode(token).identity : null;
};

const refreshToken = async () => {
  const [data] = await makeRequest({
    url: `${REFRESH_TOKEN}`,
    method: RequestMethod.POST,
    body: { username: getLoggedInUser() },
  });

  return data ? data.access_token : null;
};
export const setNewAccessTokenIfExpired = async () => {
  if (isAccessTokenExpired()) {
    console.log("refreshing token...");

    const token = await refreshToken();

    if (token) {
      httpClient.defaults.headers["Authorization"] = "Bearer " + token;
      localStorage.setItem("access_token", token);
      return token;
    } else {
      localStorage.clear();
      return null;
    }
  }
};
