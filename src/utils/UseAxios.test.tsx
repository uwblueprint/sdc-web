import { renderHook } from '@testing-library/react-hooks';
import { useAxios, ApiResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const httpHeaders = new Headers({
  'Content-Type': 'json',
  'Project-Name': 'sdc',
});

const getResponseData = { message: 'Testing successful response.' };
const successfulGetResponse: ApiResponse = {
  data: getResponseData,
  status: 200,
  headers: httpHeaders,
};

const erroneousResponse: ApiResponse = {
  data: null,
  status: 404,
  headers: httpHeaders,
};

const putRequestData = { message: 'Testing PUT request.' };
const successfulPutResponse: ApiResponse = {
  data: putRequestData,
  status: 200,
  headers: httpHeaders,
};

const postRequestData = { message: 'Testing POST request.' };
const successfulPostResponse: ApiResponse = {
  data: postRequestData,
  status: 200,
  headers: httpHeaders,
};

const successfulDeleteResponse: ApiResponse = {
  data: null,
  status: 200,
  headers: httpHeaders,
};

const url = 'https://someapi';
const urlPath = '/test';

describe('useAxios', () => {
  it('returns isLoading while waiting for response', () => {
    const { result } = renderHook(() =>
      useAxios(HttpMethods.GET, urlPath, null)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);
  });

  it('returns data if successful', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet(`${url}${urlPath}`)
      .reply(successfulGetResponse.status, getResponseData, httpHeaders);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.GET, urlPath, null)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(successfulGetResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('indicates request is unsuccessful if response status is not 200', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onAny(`${url}${urlPath}`)
      .reply(erroneousResponse.status, null, httpHeaders);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.GET, urlPath, null)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
    expect(result.current.response).toStrictEqual(erroneousResponse);
  });

  it('handles put requests that sends request data', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onAny(`${url}${urlPath}`)
      .reply(successfulPutResponse.status, putRequestData, httpHeaders);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.PUT, urlPath, putRequestData)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
    expect(result.current.response).toStrictEqual(successfulPutResponse);
  });

  it('handles post requests that sends request data', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onAny(`${url}${urlPath}`)
      .reply(successfulPostResponse.status, postRequestData, httpHeaders);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.POST, urlPath, postRequestData)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
    expect(result.current.response).toStrictEqual(successfulPostResponse);
  });

  it('handles delete requests', async () => {
    const mock = new MockAdapter(axios);
    mock
      .onAny(`${url}${urlPath}`)
      .reply(successfulDeleteResponse.status, null, httpHeaders);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.DELETE, urlPath, null)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
    expect(result.current.response).toStrictEqual(successfulDeleteResponse);
  });
});
