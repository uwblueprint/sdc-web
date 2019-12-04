import { renderHook } from '@testing-library/react-hooks';
import {
  useSwapFlowchartNodesApi,
  SwapNodesRequest,
} from '../FlowchartNodeApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

describe('useSwapFlowchartNodesApi', () => {
  it('is able to swap flowchart nodes', async () => {
    const flowchartNodeIdA = 100;
    const flowchartNodeIdB = 101;
    const url = `${baseUrl}/flowchart_node/swap`;
    const swapNodesRequest: SwapNodesRequest = {
      id_a: flowchartNodeIdA,
      id_b: flowchartNodeIdB,
    };

    const successfulSwapFlowchartNodeResponse = {
      new_a: {
        id: flowchartNodeIdA,
        text: 'd',
        header: 'dd',
        button_text: 'ddd',
        next_question: 'dddd',
        child_id: null,
        sibling_id: 4,
        is_root: false,
        flowchart_id: 100,
        deleted: false,
      },
      new_b: {
        id: flowchartNodeIdB,
        text: 'c',
        header: 'cc',
        button_text: 'ccc',
        next_question: 'cccc',
        child_id: 6,
        sibling_id: 5,
        is_root: false,
        flowchart_id: 100,
        deleted: false,
      },
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, swapNodesRequest)
      .reply(200, successfulSwapFlowchartNodeResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSwapFlowchartNodesApi(swapNodesRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulSwapFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
  it('is able to return an unsuccessful response', async () => {
    const flowchartNodeIdA = 100;
    const flowchartNodeIdB = 101;
    const url = `${baseUrl}/flowchart_node/swap`;
    const swapNodesRequest: SwapNodesRequest = {
      id_a: flowchartNodeIdA,
      id_b: flowchartNodeIdB,
    };

    const failedSwapFlowchartNodeResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(404);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSwapFlowchartNodesApi(swapNodesRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedSwapFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
  it('is able to indicate it is loading while waiting for a response', async () => {
    const flowchartNodeIdA = 100;
    const flowchartNodeIdB = 101;
    const url = `${baseUrl}/flowchart_node/swap`;
    const swapNodesRequest: SwapNodesRequest = {
      id_a: flowchartNodeIdA,
      id_b: flowchartNodeIdB,
    };

    const successfulSwapFlowchartNodeResponse = {
      new_a: {
        id: flowchartNodeIdA,
        text: 'd',
        header: 'dd',
        button_text: 'ddd',
        next_question: 'dddd',
        child_id: null,
        sibling_id: 4,
        is_root: false,
        flowchart_id: 100,
        deleted: false,
      },
      new_b: {
        id: flowchartNodeIdB,
        text: 'c',
        header: 'cc',
        button_text: 'ccc',
        next_question: 'cccc',
        child_id: 6,
        sibling_id: 5,
        is_root: false,
        flowchart_id: 100,
        deleted: false,
      },
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, swapNodesRequest)
      .reply(200, successfulSwapFlowchartNodeResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSwapFlowchartNodesApi(swapNodesRequest)
    );

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);

    await waitForNextUpdate(); // Wait for axios to recieve a reply.
  });
});
