import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';

const baseUrl = process.env.REACT_APP_API_URL;

export interface AuthenticationRequest {
  user: {
    email: string;
    password: string;
  };
}

export const useAuthenticationApi = (
  request: AuthenticationRequest
): ApiHookResponse => useAxios(HttpMethods.POST, `${baseUrl}/login`, request);
