import { useState, useEffect } from 'react';
import axios from 'axios';
import { HttpMethods } from './HttpMethods';

export const useAxios = (
  httpMethod: HttpMethods,
  urlPath: string,
  requestData: any
) => {
  const url = 'https://randomuser.me/api';
  const [response, setResponse] = useState({ data: null, status: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const axiosConfig = {
    method: httpMethod,
    url: url + urlPath,
    responseType: 'json',
    data: null,
  };

  if (httpMethod.toUpperCase() === 'PUT' && requestData !== null) {
    axiosConfig.data = requestData;
  }

  useEffect(() => {
    async function callApi() {
      //

      // await axios
      //   .get(url + urlPath)
      await axios(axiosConfig)
        .then((result: { data: Object; status: number }) => {
          setResponse({ data: result.data, status: result.status });
          setIsLoading(false);
          setIsSuccessful(true);
        })
        .catch(
          (error: {
            response: {
              data: Object;
              status: number;
              headers: Array<Array<string>>;
            };
          }) => {
            setResponse({
              data: error.response.data ? error.response.data : null,
              status: error.response.status,
            });
            setIsLoading(false);
            setIsSuccessful(false);
          }
        );
    }
    callApi();
  }, [axiosConfig, urlPath]);

  return { response, isLoading, isSuccessful };
};
