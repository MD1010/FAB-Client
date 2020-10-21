export const checkIfUserLoggedIn = (): boolean => {
  return !!localStorage.getItem("userName");
};
