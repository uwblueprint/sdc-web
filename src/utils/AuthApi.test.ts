import { renderHook } from '@testing-library/react-hooks';
import { useAuthenticationApi } from './AuthApi';
import { ApiResponse } from './UseAxios';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const email = 'testEmail@email.com';
const password = 'TestPassword';

const httpHeaders = new Headers({
  'Content-Type': 'json',
  'Project-Name': 'sdc',
});

const getRequestData = {
  user: { email, password },
};

const baseUrl = `${process.env.REACT_APP_API_URL}`;

describe('useAuthenticationApi', () => {
  it('is able to authenticate user', async () => {
    const url = `${baseUrl}/login`;
    const useAuthSuccessfulResponse: ApiResponse = {
      data: { verified: true },
      status: 200,
      headers: httpHeaders,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, getRequestData)
      .reply(
        useAuthSuccessfulResponse.status,
        useAuthSuccessfulResponse.data,
        httpHeaders
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticationApi(email, password)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(useAuthSuccessfulResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
});
