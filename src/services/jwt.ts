import jwt_decode from "jwt-decode";
import { REFRESH_TOKEN } from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { makeRequest } from "./request";

export const isAccessTokenIsExpired = (token: string | null): boolean => {
  return jwt_decode(token).exp < Date.now() / 1000;
};

export const getNewAccessTokenIfExpired = async (
  token: string | null
): Promise<string | null> => {
  if (!isAccessTokenIsExpired(token)) {
    const [data, error] = await makeRequest({
      url: `${REFRESH_TOKEN}`,
      method: RequestMethod.POST,
      body: { username: localStorage.getItem("user") },
    });
    if (data) {
      return data.access_token;
    }
  }
  return token;
};
