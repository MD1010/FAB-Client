import axios from "axios";
import jwtDecode from "jwt-decode";
import { REFRESH_TOKEN } from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { getLoggedInUser } from "./auth";
import { httpClient, makeRequest } from "./request";

export function setToken(token: string) {
  return localStorage.setItem("access_token", token);
}
export function getToken() {
  return localStorage.getItem("access_token");
}
export function isAccessTokenExpired(token: string | null): boolean {
  if (!token) return true;
  return jwtDecode(token).exp <= Date.now() / 1000;
}
export function getTokenIdentity(token: string | null): boolean {
  return token ? jwtDecode(token).identity : null;
}

const refreshToken = async () => {
  const [data] = await makeRequest({
    url: `${REFRESH_TOKEN}`,
    method: RequestMethod.POST,
    body: { username: getLoggedInUser() },
  });

  return data ? data.access_token : null;
};
export async function setNewAccessTokenIfExpired() {
  const token = getToken();
  if (!token) return null;
  if (isAccessTokenExpired(token)) {
    const token = await refreshToken();

    if (token) {
      httpClient.defaults.headers["Authorization"] = "Bearer " + token;
      setToken(token);
      return token;
    } else {
      localStorage.clear();
      return null;
    }
  }
}
