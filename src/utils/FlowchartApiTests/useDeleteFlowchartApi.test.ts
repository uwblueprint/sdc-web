import { renderHook } from '@testing-library/react-hooks';
import { useDeleteFlowchartApi } from '../FlowchartApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}`;

describe('useDeleteFlowchartApi', () => {
  it('is able to delete a flowchart', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;

    const successfulDeleteFlowchartResponse = {
      title: 'tmp',
      description: 'to be deleted',
      height: 0,
      deleted: true,
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulDeleteFlowchartResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteFlowchartApi(flowchartId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulDeleteFlowchartResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('is able to return an unsuccessful response', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;

    const failedDeleteFlowchartsResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400, failedDeleteFlowchartsResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteFlowchartApi(flowchartId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedDeleteFlowchartsResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
  it('is able to indicate it is loading while waiting for a response', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;

    const successfulDeleteFlowchartResponse = {
      title: 'tmp',
      description: 'to be deleted',
      height: 0,
      deleted: true,
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulDeleteFlowchartResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteFlowchartApi(flowchartId)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);
    await waitForNextUpdate(); // Wait for axios to recieve a reply.
  });
});
