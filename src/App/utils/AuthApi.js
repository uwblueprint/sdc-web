import useAxios from './UseAxios';

sendCredentials = (username, password) => {
  const urlPath = '/login/';
  return useAxios('POST', urlPath, { username: username, password: password });
};
