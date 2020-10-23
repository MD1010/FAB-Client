import { isAccessTokenIsExpired } from "./jwt";

export const isUserLoggedIn = (): boolean => {
  return (
    !!localStorage.getItem("user") &&
    !isAccessTokenIsExpired(localStorage.getItem("access_token"))
  );
};
