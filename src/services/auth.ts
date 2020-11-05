import {
  getTokenIdentity,
  setNewAccessTokenIfExpired,
  isAccessTokenExpired,
  getToken,
} from "./jwt";

export function isUserLoggedIn() {
  // if access token is not expired or refreshed it will be returned
  console.log("isUserLoggedIn", !!getToken());

  return !!getToken();
}
export function getLoggedInUser(): string | null {
  const token = getToken();
  return token ? getTokenIdentity(token) : null;
}
