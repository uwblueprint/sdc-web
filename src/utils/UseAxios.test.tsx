import { renderHook } from '@testing-library/react-hooks';
import { useAxios } from './UseAxios';
import { HttpMethods } from './HttpMethods';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}/test`;

describe('useAxios', () => {
  it('returns isLoading while waiting for response', () => {
    const { result } = renderHook(() => useAxios(HttpMethods.GET, url, null));

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);
  });

  it('returns data if successful', async () => {
    const successfulResponse = {
      message: 'Testing successful response.',
    };

    const mock = new MockAdapter(axios);
    mock.onGet(url).reply(200, successfulResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.GET, url, null)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(successfulResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('indicates request is unsuccessful if response status is not 200', async () => {
    const unsuccessfulGetResponse = {
      message: 'Testing unsuccessful response.',
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400, unsuccessfulGetResponse);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.GET, url, null)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
    expect(result.current.response).toStrictEqual(unsuccessfulGetResponse);
  });

  it('handles requests that sends request data', async () => {
    const requestData = { message: 'Testing request.' };
    const successfulResponse = requestData;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, requestData);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios(HttpMethods.PUT, url, requestData)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(successfulResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  describe('GET requests', () => {
    it('relays message if successful response', async () => {
      const requestData = { data: 'some data' };
      const successfulGetResponse = {
        message: 'Testing successful GET response.',
      };

      const mock = new MockAdapter(axios);
      mock.onGet(url, requestData).reply(200, successfulGetResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.GET, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(successfulGetResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(true);
    });
    it('relays message if unsuccessful response', async () => {
      const requestData = { data: 'some data' };
      const unsuccessfulGetResponse = {
        message: 'Testing unsuccessful GET response.',
      };

      const mock = new MockAdapter(axios);
      mock.onGet(url, requestData).reply(400, unsuccessfulGetResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.GET, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(unsuccessfulGetResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(false);
    });
  });

  describe('POST requests', () => {
    it('relays message if successful response', async () => {
      const requestData = { data: 'some data' };
      const successfulPostResponse = {
        message: 'Testing successful POST response.',
      };

      const mock = new MockAdapter(axios);
      mock.onPost(url, requestData).reply(200, successfulPostResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.POST, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(successfulPostResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(true);
    });
    it('relays message if unsuccessful response', async () => {
      const requestData = { data: 'some data' };
      const unsuccessfulPostResponse = {
        message: 'Testing unsuccessful POST response.',
      };

      const mock = new MockAdapter(axios);
      mock.onPost(url, requestData).reply(400, unsuccessfulPostResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.POST, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(unsuccessfulPostResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(false);
    });
  });

  describe('PUT requests', () => {
    it('relays message if successful response', async () => {
      const requestData = { data: 'some data' };
      const successfulPutResponse = {
        message: 'Testing successful PUT response.',
      };

      const mock = new MockAdapter(axios);
      mock.onPut(url, requestData).reply(200, successfulPutResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.PUT, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(successfulPutResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(true);
    });
    it('relays message if unsuccessful response', async () => {
      const requestData = { data: 'some data' };
      const unsuccessfulPutResponse = {
        message: 'Testing unsuccessful PUT response.',
      };

      const mock = new MockAdapter(axios);
      mock.onPut(url, requestData).reply(400, unsuccessfulPutResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.PUT, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(unsuccessfulPutResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(false);
    });
  });

  describe('DELETE requests', () => {
    it('relays message if successful response', async () => {
      const requestData = { data: 'some data' };
      const successfulDeleteResponse = {
        message: 'Testing successful DELETE response.',
      };

      const mock = new MockAdapter(axios);
      mock.onDelete(url, requestData).reply(200, successfulDeleteResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.DELETE, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(successfulDeleteResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(true);
    });
    it('relays message if unsuccessful response', async () => {
      const requestData = { data: 'some data' };
      const unsuccessfulDeleteResponse = {
        message: 'Testing unsuccessful DELETE response.',
      };

      const mock = new MockAdapter(axios);
      mock.onDelete(url, requestData).reply(400, unsuccessfulDeleteResponse);

      const { result, waitForNextUpdate } = renderHook(() =>
        useAxios(HttpMethods.DELETE, url, requestData)
      );

      await waitForNextUpdate();

      expect(result.current.response).toStrictEqual(unsuccessfulDeleteResponse);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isSuccessful).toEqual(false);
    });
  });
});
