import axios, { AxiosError } from 'axios';
import { RequestMethod } from 'src/types/RequestMethod';

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
  } else {
    try {
      const { data } = await axios.post(url, body, { headers, method });
      console.log('data', data);
      return [data, null];
    } catch (error) {
      if (!error.response?.data) throw error;
      console.log(error.response?.data);

      return [null, error.response?.data];
    }
  }
};
