export const setLocalStorageFields = (
  accessToken: string,
  refreshToken: string,
  username: string
) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("user", username);
};
