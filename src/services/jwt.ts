import axios from "axios";
import jwtDecode from "jwt-decode";
import { REFRESH_TOKEN } from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { getLoggedInUser } from "./auth";
import { httpClient, makeRequest } from "./request";

export const isAccessTokenExpired = (token: string | null): boolean => {
  // console.log(jwtDecode(token).exp <= Date.now() / 1000);
  // console.log(token);
  // console.log(jwtDecode(token));

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
  let token = localStorage.getItem("access_token");

  if (isAccessTokenExpired(token)) {
    console.log("refreshing token...");

    const token = await refreshToken();
    console.log(token);

    if (token) {
      httpClient.defaults.headers["Authorization"] = "Bearer " + token;
      console.log("set token ->", token);

      localStorage.setItem("access_token", token);
      return token;
    } else {
      localStorage.clear();
      return null;
    }
  }
  return token;
};
