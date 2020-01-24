import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpMethods } from './HttpMethods';

export interface ApiHookResponse {
  response: any;
  isLoading: boolean;
  isSuccessful: boolean;
}

export const useAxios = (
  httpMethod: HttpMethods,
  url: string,
  requestData: any
): ApiHookResponse => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const axiosConfig: AxiosRequestConfig = {
    method: httpMethod,
    url,
    responseType: 'json',
    data: requestData,
  };

  useEffect(() => {
    async function callApi() {
      debugger;
      await axios(axiosConfig)
        .then((result: { data: any }) => {
          setResponse(result.data === undefined ? null : result.data);
          setIsLoading(false);
          setIsSuccessful(true);
        })
        .catch((error: { response: any }) => {
          setResponse(
            !error.response || error.response.data === undefined
              ? null
              : error.response.data
          );
          setIsLoading(false);
          setIsSuccessful(false);
          console.log(error);
          console.log(url);
          console.log('hisdfsdf');
        });
    }
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, isLoading, isSuccessful };
};
