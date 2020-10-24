import { isAccessTokenExpired } from "./jwt";

export const isUserLoggedIn = (): boolean => {
  return (
    !!localStorage.getItem("user") &&
    !isAccessTokenExpired(localStorage.getItem("access_token"))
  );
};
