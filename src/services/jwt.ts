import axios from "axios";
import jwt_decode from "jwt-decode";
import { REFRESH_TOKEN } from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { getLoggedInUser } from "./auth";
import { httpClient, makeRequest } from "./request";

export const isAccessTokenExpired = (token: string | null): boolean => {
  console.log(jwt_decode(token).exp <= Date.now() / 1000);
  console.log(token);
  console.log(jwt_decode(token));

  if (!token) return false;
  return jwt_decode(token).exp <= Date.now() / 1000;
};
export const getTokenIdentity = (token: string | null): boolean => {
  return token ? jwt_decode(token).identity : null;
};

const refreshToken = async () => {
  const [{ access_token: token }] = await makeRequest({
    url: `${REFRESH_TOKEN}`,
    method: RequestMethod.POST,
    body: { username: getLoggedInUser() },
  });
  return token;
};
export const setNewAccessTokenIfExpired = () => {
  let token = localStorage.getItem("access_token");
  if (!token) return false;
  if (isAccessTokenExpired(token)) {
    console.log("refreshing token...");

    return refreshToken().then((token) => {
      if (token) {
        httpClient.defaults.headers["Authorization"] = "Bearer " + token;
        localStorage.setItem("access_token", token);
        return true;
      } else {
        localStorage.clear();
        return false;
      }
    });
  } else return true;
};
