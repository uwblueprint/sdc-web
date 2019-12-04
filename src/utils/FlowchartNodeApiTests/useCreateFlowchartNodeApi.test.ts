import { renderHook } from '@testing-library/react-hooks';
import {
  useCreateFlowchartNodeApi,
  CreateFlowchartNodeRequest,
} from '../FlowchartNodeApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

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
  it('is able to indicate it is loading while waiting for a response', async () => {
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

    expect(result.current.isLoading).toEqual(true);
    expect(result.current.isSuccessful).toEqual(false);
    await waitForNextUpdate(); // Wait for axios to recieve a reply.
  });
});
