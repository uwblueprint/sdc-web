import { renderHook } from '@testing-library/react-hooks';
import { useDeleteFlowchartNodeApi } from '../FlowchartNodeApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

describe('useDeleteFlowchartNodeApi', () => {
  it('is able to delete a flowchart node', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const successfulDeleteFlowchartNodeResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulDeleteFlowchartNodeResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteFlowchartNodeApi(flowchartNodeId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulDeleteFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
  it('is able to return an unsuccessful response', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const failedDeleteFlowchartNodeResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400);
    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteFlowchartNodeApi(flowchartNodeId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedDeleteFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});
