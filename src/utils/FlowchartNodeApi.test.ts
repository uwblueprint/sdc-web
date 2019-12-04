import { renderHook } from '@testing-library/react-hooks';
import {
  useGetFlowchartNodeApi,
  useUpdateFlowchartNodeApi,
  useSwapFlowchartNodesApi,
  useDeleteFlowchartNodeApi,
  useCreateFlowchartNodeApi,
  SwapNodesRequest,
  CreateFlowchartNodeRequest,
  UpdateFlowchartNodeRequest,
} from './FlowchartNodeApi';
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

describe('useUpdateFlowchartNodeApi', () => {
  it('is able to update a flowchart node', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;
    const updateFlowchartNodeRequest: UpdateFlowchartNodeRequest = {
      text: 'mock text',
      header: 'mock header',
      button_text: 'mock button text',
      next_question: 'mock next question',
    };

    const successfulUpdateFlowchartNodeResponse = {
      ...updateFlowchartNodeRequest,
      prev_id: 1,
      is_child: true,
      child_id: null,
      sibling_id: null,
      is_root: false,
      flowchart_id: 100,
      deleted: false,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, updateFlowchartNodeRequest)
      .reply(200, successfulUpdateFlowchartNodeResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useUpdateFlowchartNodeApi(flowchartNodeId, updateFlowchartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulUpdateFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
  it('is able to return an unsuccessful response', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const updateFlowchartNodeRequest: UpdateFlowchartNodeRequest = {
      text: 'mock text',
      header: 'mock header',
      button_text: 'mock button text',
      next_question: 'mock next question',
    };

    const failedUpdateFlowchartNodeResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(404);

    const { result, waitForNextUpdate } = renderHook(() =>
      useUpdateFlowchartNodeApi(flowchartNodeId, updateFlowchartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedUpdateFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});

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
});

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

describe('useCreateFlowchartNodeApi', () => {
  it('is able to create flowchart node', async () => {
    const url = `${baseUrl}/flowchart_node`;
    const createFlowchartNodeRequest: CreateFlowchartNodeRequest = {
      prev_id: 1,
      is_child: true,
      text: 'mock text',
      header: 'mock header',
      button_text: 'mock button text',
      next_question: 'mock next question',
    };

    const successfulCreateFlowchartNodeResponse = {
      ...createFlowchartNodeRequest,
      child_id: null,
      sibling_id: null,
      is_root: false,
      flowchart_id: 100,
      deleted: false,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, createFlowchartNodeRequest)
      .reply(200, successfulCreateFlowchartNodeResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateFlowchartNodeApi(createFlowchartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulCreateFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
  it('is able to return an unsuccessful response', async () => {
    const url = `${baseUrl}/flowchart_node`;
    const createFlowchartNodeRequest: CreateFlowchartNodeRequest = {
      prev_id: 1,
      is_child: true,
      text: 'mock text',
      header: 'mock header',
      button_text: 'mock button text',
      next_question: 'mock next question',
    };

    const failedCreateFlowchartNodeResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url, createFlowchartNodeRequest).reply(400);
    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateFlowchartNodeApi(createFlowchartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedCreateFlowchartNodeResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});
