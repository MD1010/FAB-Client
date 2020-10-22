export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
export const getLocalStorageItemValue = (key: string) => {
  return localStorage.getItem(key);
};
