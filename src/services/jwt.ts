import axios from "axios";
import jwtDecode from "jwt-decode";
import { REFRESH_TOKEN } from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { getLoggedInUser } from "./auth";
import { httpClient, makeRequest } from "./request";

export enum TokenType {
  ACCESS = "access_token",
  REFRESH = "refresh_token",
}
export function setToken(type: TokenType, token: string) {
  return localStorage.setItem(type, token);
}
export function getToken(type: TokenType) {
  return localStorage.getItem(type);
}
export function isAccessTokenExpired(token: string | null): boolean {
  if (!token) return true;
  return jwtDecode(token).exp <= Date.now() / 1000;
}
export function getTokenIdentity(token: string | null): string | null {
  return token ? jwtDecode(token).identity : null;
}

const refreshToken = async () => {
  const [data] = await makeRequest({
    url: `${REFRESH_TOKEN}`,
    method: RequestMethod.POST,
    body: { username: getLoggedInUser() },
    headers: { Authorization: `Bearer ${getToken(TokenType.REFRESH)}` },
  });

  return data ? data.access_token : null;
};
export async function setNewAccessTokenIfExpired() {
  const token = getToken(TokenType.ACCESS);
  if (!token) return null;
  if (isAccessTokenExpired(token)) {
    const token = await refreshToken();

    if (token) {
      httpClient.defaults.headers["Authorization"] = "Bearer " + token;
      setToken(TokenType.ACCESS, token);
      return token;
    } else {
      localStorage.clear();
      return null;
    }
  }
}
