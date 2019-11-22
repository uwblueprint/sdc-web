import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpMethods } from './HttpMethods';

export interface ApiResponse {
  data: Object | null;
  status: number;
  headers: Headers;
}

export const useAxios = (
  httpMethod: HttpMethods,
  urlPath: string,
  requestData: any
) => {
  const url = 'https://someapi';
  const initialApiResponse: ApiResponse = {
    data: null,
    status: null,
    headers: new Headers(),
  };
  const [response, setResponse] = useState(initialApiResponse);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const axiosConfig: AxiosRequestConfig = {
    method: httpMethod,
    url: url + urlPath,
    responseType: 'json',
    data: null,
  };

  if (
    (httpMethod === HttpMethods.PUT || httpMethod === HttpMethods.POST) &&
    requestData !== null
  ) {
    axiosConfig.data = requestData;
  }

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
        .catch(
          (error: {
            response: {
              data: Object;
              status: number;
              headers: Headers;
            };
          }) => {
            setResponse({
              data: error.response ? error.response.data : null,
              status: error.response ? error.response.status : -1,
              headers: error.response ? error.response.headers : new Headers(),
            });
            setIsLoading(false);
            setIsSuccessful(false);
          }
        );
    }
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, isLoading, isSuccessful };
};
