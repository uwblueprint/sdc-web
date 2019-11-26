import { renderHook } from '@testing-library/react-hooks';
import {
  useGetFlowchartNodeApi,
  useUpdateFlowchartNodeApi,
  useSwapFlowchartNodesApi,
  useDeleteFlowchartNodeApi,
  useCreateFlowchartNodeApi,
  SwapNodesRequest,
  CreateFlowcharNodeRequest,
} from './FlowchartNodeApi';
import { ApiResponse } from './UseAxios';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const httpHeaders = new Headers({
  'Content-Type': 'json',
  'Project-Name': 'sdc',
});

describe('useCreateFlowchartNodeApi', () => {
  it('is able to create flowchart node', async () => {
    const url = `${baseUrl}/flowchart_node`;
    const createFlowChartNodeRequest: CreateFlowcharNodeRequest = {
      prev_id: 1,
      is_child: true,
      text: 'mock text',
      header: 'mock header',
      button_text: 'mock button text',
      next_question: 'mock next question',
    };

    const createFlowchartNodeSuccessfulResponse: ApiResponse = {
      data: {
        ...createFlowChartNodeRequest,
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
      .onAny(url, createFlowChartNodeRequest)
      .reply(
        createFlowchartNodeSuccessfulResponse.status,
        createFlowchartNodeSuccessfulResponse.data,
        createFlowchartNodeSuccessfulResponse.headers
      );

    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateFlowchartNodeApi(createFlowChartNodeRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      createFlowchartNodeSuccessfulResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('is able to refuse request to create flowchart node', () => {});
});
