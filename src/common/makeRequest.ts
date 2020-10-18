import axios from 'axios';
import { RequestMethod } from 'src/types/RequestMethod';

axios.interceptors.request.use(config => {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDI5NjUyNzksIm5iZiI6MTYwMjk2NTI3OSwianRpIjoiODRkZmIxOGYtZGVjYS00MTYzLWEyOTAtYzRjMjZjYWM4ZTBhIiwiZXhwIjoxNjAyOTc2MDc5LCJpZGVudGl0eSI6eyJ1c2VybmFtZSI6Ik1EMTAifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.QhOZFa365BqgR_ZojDK01xgvzuo6J8bZd1XPpceNI2Y";//localStorage.getItem("token"); 
  if (token) config.headers["Authorization"] = 'Bearer ' + token;
  return config;
}, error => Promise.reject(error));

export const makeRequest = async ({
  url,
  method = RequestMethod.GET,
  params,
  body,
  headers,
}: {
  url: string;
  method?: RequestMethod;
  params?: any;
  body?: any;
  headers?: any;
}) => {
  if (method === RequestMethod.GET) {
    try {
      const { data } = await axios.get(url, { params, headers });

      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;
      return [null, error.response?.data];
    }
  } else if (method === RequestMethod.POST){
    try {
      const { data } = await axios.post(url, body, { headers, method });
      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;

      return [null, error.response?.data];
    }
  } else {
    try {
      const { data } = await axios.delete(url);
      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;

      return [null, error.response?.data];
    }
  }
};
