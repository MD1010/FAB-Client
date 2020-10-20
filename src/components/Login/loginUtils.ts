export const setLocalStorageFields = (
  accessToken: string,
  refreshToken: string,
  userName: string
) => {
  localStorage.setItem("jwtAccess", accessToken);
  localStorage.setItem("jwtRefresh", refreshToken);
  localStorage.setItem("userName", userName);
};
