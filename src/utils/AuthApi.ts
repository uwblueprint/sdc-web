import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';

const baseUrl = process.env.REACT_APP_API_URL;

export const useAuthenticationApi = (
  email: string,
  password: string
): ApiHookResponse =>
  useAxios(HttpMethods.POST, `${baseUrl}/login`, { user: { email, password } });
