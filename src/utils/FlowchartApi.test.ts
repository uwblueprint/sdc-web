import { renderHook } from '@testing-library/react-hooks';
import {
  useGetFlowchartsApi,
  useGetFlowchartApi,
  useUpdateFlowchartApi,
  useDeleteFlowchartApi,
  useCreateFlowchartApi,
  UpdateFlowchartRequest,
  CreateFlowchartRequest,
} from './FlowchartApi';
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

describe('useGetFlowchartApi', () => {
  it('is able to get all flowchart', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;

    const successfulGetFlowchartResponse = {
      flowchart: {
        id: 1,
        title: 'chart 1',
        description: 'this chart is about abc',
        height: 3,
        root_id: 1,
        deleted: false,
      },
      flowchartnodes: {
        '1': {
          button_text: null,
          child_id: 10,
          deleted: false,
          flowchart_id: 1,
          header: 'Options',
          id: 1,
          is_root: true,
          next_question: null,
          sibling_id: null,
          text: 'New Node',
        },
        '10': {
          button_text: null,
          child_id: 7,
          deleted: false,
          flowchart_id: 1,
          header: 'n1',
          id: 10,
          is_root: false,
          next_question: null,
          sibling_id: 9,
          text: 'n1',
        },
      },
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulGetFlowchartResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartApi(flowchartId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulGetFlowchartResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('is able to return an unsuccessful response', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;

    const failedGetFlowchartResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400, failedGetFlowchartResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetFlowchartApi(flowchartId)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(failedGetFlowchartResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});

describe('useUpdateFlowchartApi', () => {
  it('is able to update a flowchart', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;

    const updateFlowchartRequest: UpdateFlowchartRequest = {
      title: 'updated',
      description: 'updated',
    };

    const successfulUpdateFlowchartResponse = {
      flowchart: {
        id: 1,
        title: 'updated',
        description: 'updated',
        height: 3,
        root_id: 1,
        deleted: false,
      },
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulUpdateFlowchartResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useUpdateFlowchartApi(flowchartId, updateFlowchartRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulUpdateFlowchartResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('is able to return an unsuccessful response', async () => {
    const flowchartId = 1;
    const url = `${baseUrl}/flowchart/${flowchartId}`;
    const updateFlowchartRequest: UpdateFlowchartRequest = {
      title: 'updated',
      description: 'updated',
    };

    const failedGetFlowchartsResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400, failedGetFlowchartsResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useUpdateFlowchartApi(flowchartId, updateFlowchartRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(failedGetFlowchartsResponse);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});

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
});

describe('useCreateFlowchartRequest', () => {
  it('is able to delete a flowchart', async () => {
    const url = `${baseUrl}/flowchart`;

    const createFlowchartRequest: CreateFlowchartRequest = {
      title: 'chart 1',
      description: 'A flowchart',
    };

    const successfulCreateFlowchartResponse = {
      title: 'chart 1',
      description: 'A flowchart',
      height: 0,
      root_id: 11,
      deleted: false,
    };

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(200, successfulCreateFlowchartResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateFlowchartApi(createFlowchartRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      successfulCreateFlowchartResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(true);
  });

  it('is able to return an unsuccessful response', async () => {
    const url = `${baseUrl}/flowchart`;

    const createFlowchartRequest: CreateFlowchartRequest = {
      title: 'chart 1',
      description: 'A flowchart',
    };

    const failedCreateFlowchartsResponse = null;

    const mock = new MockAdapter(axios);
    mock.onAny(url).reply(400, failedCreateFlowchartsResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useCreateFlowchartApi(createFlowchartRequest)
    );

    await waitForNextUpdate();

    expect(result.current.response).toStrictEqual(
      failedCreateFlowchartsResponse
    );
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.isSuccessful).toEqual(false);
  });
});
