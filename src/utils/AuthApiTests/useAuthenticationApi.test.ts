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
    const useAuthSuccessfulResponse = { verified: true };

    const mock = new MockAdapter(axios);
    mock.onAny(url, getRequestData).reply(200, useAuthSuccessfulResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticationApi(getRequestData)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(useAuthSuccessfulResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
});
