import useAxios from './UseAxios';

export const sendCredentials = (username, password) => {
  const urlPath = '/login/';
  return useAxios('POST', urlPath, { username, password });
};
