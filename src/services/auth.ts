import { getTokenIdentity, setNewAccessTokenIfExpired } from "./jwt";

export const isUserLoggedIn = () => {
  // if access token is not expired or refreshed it will be returned
  return !!localStorage.getItem("access_token");
};
export const getLoggedInUser = () => {
  const token = localStorage.getItem("access_token");
  return getTokenIdentity(token);
};
