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
import { ApiResponse } from './UseAxios';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const httpHeaders = new Headers({
  'Content-Type': 'json',
  'Project-Name': 'sdc',
});

describe('useGetFlowchartNodeApi', () => {
  it('is able to get a flowchart node', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const getFlowchartNodeSuccessfulResponse: ApiResponse = {
      data: {
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
      },
      status: 200,
      headers: httpHeaders,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url)
      .reply(
        getFlowchartNodeSuccessfulResponse.status,
        getFlowchartNodeSuccessfulResponse.data,
        getFlowchartNodeSuccessfulResponse.headers
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartNodeApi(flowchartNodeId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      getFlowchartNodeSuccessfulResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
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

    const updateFlowchartNodeSuccessfulResponse: ApiResponse = {
      data: {
        ...updateFlowchartNodeRequest,
        prev_id: 1,
        is_child: true,
        child_id: null,
        sibling_id: null,
        is_root: false,
        flowchart_id: 100,
        deleted: false,
      },
      status: 200,
      headers: httpHeaders,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, updateFlowchartNodeRequest)
      .reply(
        updateFlowchartNodeSuccessfulResponse.status,
        updateFlowchartNodeSuccessfulResponse.data,
        updateFlowchartNodeSuccessfulResponse.headers
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useUpdateFlowchartNodeApi(flowchartNodeId, updateFlowchartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      updateFlowchartNodeSuccessfulResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
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

    const swapFlowchartNodeSuccessfulResponse: ApiResponse = {
      data: {
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
      },
      status: 200,
      headers: httpHeaders,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, swapNodesRequest)
      .reply(
        swapFlowchartNodeSuccessfulResponse.status,
        swapFlowchartNodeSuccessfulResponse.data,
        swapFlowchartNodeSuccessfulResponse.headers
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useSwapFlowchartNodesApi(swapNodesRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      swapFlowchartNodeSuccessfulResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
});

describe('useDeleteFlowchartNodeApi', () => {
  it('is able to delete a flowchart node', async () => {
    const flowchartNodeId = 100;
    const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

    const deleteFlowchartNodeSuccessfulResponse: ApiResponse = {
      data: null,
      status: 200,
      headers: httpHeaders,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url)
      .reply(
        deleteFlowchartNodeSuccessfulResponse.status,
        deleteFlowchartNodeSuccessfulResponse.data,
        deleteFlowchartNodeSuccessfulResponse.headers
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useDeleteFlowchartNodeApi(flowchartNodeId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      deleteFlowchartNodeSuccessfulResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
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

    const createFlowchartNodeSuccessfulResponse: ApiResponse = {
      data: {
        ...createFlowchartNodeRequest,
        child_id: null,
        sibling_id: null,
        is_root: false,
        flowchart_id: 100,
        deleted: false,
      },
      status: 200,
      headers: httpHeaders,
    };

    const mock = new MockAdapter(axios);
    mock
      .onAny(url, createFlowchartNodeRequest)
      .reply(
        createFlowchartNodeSuccessfulResponse.status,
        createFlowchartNodeSuccessfulResponse.data,
        createFlowchartNodeSuccessfulResponse.headers
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateFlowchartNodeApi(createFlowchartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      createFlowchartNodeSuccessfulResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });
});
