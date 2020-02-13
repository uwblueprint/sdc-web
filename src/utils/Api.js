import axios from 'axios';

export const request = (httpMethod, url, requestData) => {
    const axiosConfig = {
        method: httpMethod,
        url,
        responseType: 'json',
        data: requestData,
      };
      return axios(axiosConfig)
      .then(({data}) => {
          if (!data) return null;
          return data;
      });
  }