import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpMethods } from './HttpMethods';

export interface ApiResponse {
  data: Object | null;
  status: number;
  headers: Headers;
}

export interface ApiHookResponse {
  response: ApiResponse | null;
  isLoading: boolean;
  isSuccessful: boolean;
}

export const useAxios = (
  httpMethod: HttpMethods,
  url: string,
  requestData: any
): ApiHookResponse => {
  const initialApiResponse: ApiResponse = {
    data: null,
    status: -1,
    headers: new Headers(),
  };
  const [response, setResponse] = useState(initialApiResponse);
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
      await axios(axiosConfig)
        .then((result: { data: Object; status: number; headers: Headers }) => {
          setResponse({
            data: result.data,
            status: result.status,
            headers: result.headers,
          });
          setIsLoading(false);
          setIsSuccessful(true);
        })
        .catch((error: { response: ApiResponse }) => {
          setResponse({
            data: error.response ? error.response.data : null,
            status: error.response ? error.response.status : -1,
            headers: error.response ? error.response.headers : new Headers(),
          });
          setIsLoading(false);
          setIsSuccessful(false);
        });
    }
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, isLoading, isSuccessful };
};
