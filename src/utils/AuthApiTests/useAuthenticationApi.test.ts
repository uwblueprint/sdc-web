import { renderHook } from '@testing-library/react-hooks';
import { useAuthenticationApi, AuthenticationRequest } from '../AuthApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('useAuthenticationApi', () => {
  it('is able to authenticate user', async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    const getRequestData: AuthenticationRequest = {
      user: { email: 'testEmail@email.com', password: 'TestPassword' },
    };

    const url = `${baseUrl}/login`;
    const successfulUseAuthResponse = { verified: true };

    const mock = new MockAdapter(axios);
    mock.onAny(url, getRequestData).reply(200, successfulUseAuthResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticationApi(getRequestData)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(successfulUseAuthResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
  it('is able to return an unsuccessful authentication', async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    const getRequestData: AuthenticationRequest = {
      user: { email: 'testEmail@email.com', password: 'TestPassword' },
    };

    const url = `${baseUrl}/login`;
    const failedUseAuthResponse = { verified: false };

    const mock = new MockAdapter(axios);
    mock.onAny(url, getRequestData).reply(400, failedUseAuthResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticationApi(getRequestData)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(failedUseAuthResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
  it('is able to indicate it is loading while waiting for a response', async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    const getRequestData: AuthenticationRequest = {
      user: { email: 'testEmail@email.com', password: 'TestPassword' },
    };

    const url = `${baseUrl}/login`;
    const successfulUseAuthResponse = { verified: true };

    const mock = new MockAdapter(axios);
    mock.onAny(url, getRequestData).reply(200, successfulUseAuthResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticationApi(getRequestData)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);

    await waitForNextUpdate(); // Wait for axios to recieve a reply.
  });
});
