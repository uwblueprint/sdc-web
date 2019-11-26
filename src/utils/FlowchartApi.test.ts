import { renderHook } from '@testing-library/react-hooks';
import {
  useGetFlowchartsApi,
  useGetFlowchartApi,
  useUpdateFlowchartApi,
  useDeleteFlowchartApi,
} from './FlowchartApi';
import { ApiResponse } from './UseAxios';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const httpHeaders = new Headers({
  'Content-Type': 'json',
  'Project-Name': 'sdc',
});

const successfulGetFlowchartsResponse: ApiResponse = {
  data: {
    flowcharts: [
      { id: 1, description: 'flowchart 1' },
      { id: 2, description: 'flowchart 2' },
    ],
  },
  status: 200,
  headers: httpHeaders,
};

const failedGetFlowchartsResponse: ApiResponse = {
  data: {},
  status: 400,
  headers: httpHeaders,
};

const baseUrl = `${process.env.REACT_APP_API_URL}`;

describe('useGetFlowchartsApi', () => {
  it('is able to return successful response', async () => {
    const url = `${baseUrl}/flowcharts`;

    const mock = new MockAdapter(axios);
    mock
      .onAny(url)
      .reply(
        successfulGetFlowchartsResponse.status,
        successfulGetFlowchartsResponse.data,
        httpHeaders
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartsApi()
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulGetFlowchartsResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('is able to return unsuccessful response', async () => {
    const url = `${baseUrl}/flowcharts`;

    const mock = new MockAdapter(axios);
    mock
      .onAny(url)
      .reply(
        failedGetFlowchartsResponse.status,
        failedGetFlowchartsResponse.data,
        httpHeaders
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartsApi()
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(failedGetFlowchartsResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});
