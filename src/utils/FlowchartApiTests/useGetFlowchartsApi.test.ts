import { renderHook } from '@testing-library/react-hooks';
import { useGetFlowchartsApi } from '../FlowchartApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}`;

describe('useGetFlowchartsApi', () => {
  it('is able to get a flowchart', async () => {
    const url = `${baseUrl}/flowcharts`;

    const successfulGetFlowchartsResponse = {
      flowcharts: [
        {
          id: 1,
          title: 'chart 1',
          description: 'this chart is about abc',
          height: 3,
          root_id: 1,
          deleted: false,
        },
        {
          id: 2,
          title: 'chart 2',
          description: 'this chart is about def',
          height: 3,
          root_id: 1,
          deleted: false,
        },
      ],
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulGetFlowchartsResponse);

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

  it('is able to return an unsuccessful response', async () => {
    const failedGetFlowchartsResponse = null;
    const url = `${baseUrl}/flowcharts`;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400, failedGetFlowchartsResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartsApi()
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(failedGetFlowchartsResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});
