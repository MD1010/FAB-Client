import axios from 'axios';
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
      return [null, error];
    }
  } else {
    try {
      const { data } = await axios.post(url, body, { headers, method });
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }
};
