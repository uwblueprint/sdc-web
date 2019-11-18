import { renderHook } from '@testing-library/react-hooks';
import { useAxios } from './UseAxios';
import { HttpMethods } from './HttpMethods';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const successulResponseData = { message: 'Testing' };
const successulResponse = {
  data: successulResponseData,
  status: 200,
};
const erroneousResponse = {
  data: null,
  status: 404,
};
const putResponse = {};
const loadingResponse = {
  response: null,
  isLoading: true,
  isSuccessful: false,
};
const url = 'https://randomuser.me/api';

describe('useAxios', () => {
  it('returns isLoading while waiting for response', () => {
    const { result } = renderHook(() =>
      useAxios(HttpMethods.GET, '/test', null)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);
  });
  it('returns data if isSuccessful', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onAny(`${url}/test`)
      .reply(successulResponse.status, successulResponseData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.GET, '/test', null)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(successulResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('returns status text if unsuccessful', async () => {
    const mock = new MockAdapter(axios);
    mock.onAny(`${url}/test`).reply(erroneousResponse.status, null);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.GET, '/test', null)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
    expect(result.current.response).toStrictEqual(erroneousResponse);
  });
  it('handles put requests that send objects', () => {});
});
