import { renderHook } from '@testing-library/react-hooks';
import { useGetFlowchartNodeApi } from '../FlowchartNodeApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

describe('useGetFlowchartNodeApi', () => {
  it('is able to get a flowchart node', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const successfulGetFlowchartNodeResponse = {
      prev_id: 1,
      is_child: true,
      text: 'mock text',
      header: 'mock header',
      button_text: 'mock button text',
      next_question: 'mock next question',
      child_id: null,
      sibling_id: null,
      is_root: false,
      flowchart_id: flowchartNodeId,
      deleted: false,
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulGetFlowchartNodeResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartNodeApi(flowchartNodeId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulGetFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
  it('is able to return an unsuccessful response', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const failedGetFlowchartNodeResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartNodeApi(flowchartNodeId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedGetFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});
