describe('test', () => {
  it('test', () => {
    expect(true).toEqual(true);
  });
});

// import { renderHook } from '@testing-library/react-hooks';
// import { useCreateFlowchartApi, CreateFlowchartRequest } from '../FlowchartApi';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';

// const baseUrl = `${process.env.REACT_APP_API_URL}`;

// describe('useCreateFlowchartRequest', () => {
//   it('is able to delete a flowchart', async () => {
//     const url = `${baseUrl}/flowchart`;

//     const createFlowchartRequest: CreateFlowchartRequest = {
//       title: 'chart 1',
//       description: 'A flowchart',
//     };

//     const successfulCreateFlowchartResponse = {
//       title: 'chart 1',
//       description: 'A flowchart',
//       height: 0,
//       root_id: 11,
//       deleted: false,
//     };

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(200, successfulCreateFlowchartResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useCreateFlowchartApi(createFlowchartRequest)
//     );

//     await waitForNextUpdate();

//     expect(result.current.response).toStrictEqual(
//       successfulCreateFlowchartResponse
//     );
//     expect(result.current.isLoading).toEqual(false);
//     expect(result.current.isSuccessful).toEqual(true);
//   });

//   it('is able to return an unsuccessful response', async () => {
//     const url = `${baseUrl}/flowchart`;

//     const createFlowchartRequest: CreateFlowchartRequest = {
//       title: 'chart 1',
//       description: 'A flowchart',
//     };

//     const failedCreateFlowchartsResponse = null;

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(400, failedCreateFlowchartsResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useCreateFlowchartApi(createFlowchartRequest)
//     );

//     await waitForNextUpdate();

//     expect(result.current.response).toStrictEqual(
//       failedCreateFlowchartsResponse
//     );
//     expect(result.current.isLoading).toEqual(false);
//     expect(result.current.isSuccessful).toEqual(false);
//   });
//   it('is able to indicate it is loading while waiting for a response', async () => {
//     const url = `${baseUrl}/flowchart`;

//     const createFlowchartRequest: CreateFlowchartRequest = {
//       title: 'chart 1',
//       description: 'A flowchart',
//     };

//     const successfulCreateFlowchartResponse = {
//       title: 'chart 1',
//       description: 'A flowchart',
//       height: 0,
//       root_id: 11,
//       deleted: false,
//     };

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(200, successfulCreateFlowchartResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useCreateFlowchartApi(createFlowchartRequest)
//     );

//     expect(result.current.isLoading).toEqual(true);
//     expect(result.current.isSuccessful).toEqual(false);
//     await waitForNextUpdate(); // Wait for axios to recieve a reply.
//   });
// });
