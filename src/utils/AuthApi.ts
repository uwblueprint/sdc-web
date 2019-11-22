import { useAxios } from './UseAxios';
import { HttpMethods } from './HttpMethods';

export const useAuthentication = (username: string, password: string) => {
  const urlPath = '/login/';
  return useAxios(HttpMethods.POST, urlPath, { username, password });
};
