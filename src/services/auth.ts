import {
  getTokenIdentity,
  setNewAccessTokenIfExpired,
  isAccessTokenExpired,
  getToken,
} from "./jwt";

export function isUserLoggedIn() {
  // if access token is not expired or refreshed it will be returned
  console.log("isUserLoggedIn");

  return !!getToken();
}
export function getLoggedInUser() {
  const token = getToken();
  console.log("get identity", token);

  return token && getTokenIdentity(token);
}
