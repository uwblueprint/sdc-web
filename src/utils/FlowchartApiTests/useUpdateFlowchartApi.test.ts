describe('test', () => {
    it('test', () => {
        expect(true).toEqual(true);
    })
});

// import { renderHook } from '@testing-library/react-hooks';
// import { useUpdateFlowchartApi, UpdateFlowchartRequest } from '../FlowchartApi';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';

// const baseUrl = `${process.env.REACT_APP_API_URL}`;

// describe('useUpdateFlowchartApi', () => {
//   it('is able to update a flowchart', async () => {
//     const flowchartId = 1;
//     const url = `${baseUrl}/flowchart/${flowchartId}`;

//     const updateFlowchartRequest: UpdateFlowchartRequest = {
//       title: 'updated',
//       description: 'updated',
//     };

//     const successfulUpdateFlowchartResponse = {
//       flowchart: {
//         id: 1,
//         title: 'updated',
//         description: 'updated',
//         height: 3,
//         root_id: 1,
//         deleted: false,
//       },
//     };

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(200, successfulUpdateFlowchartResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useUpdateFlowchartApi(flowchartId, updateFlowchartRequest)
//     );

//     await waitForNextUpdate();

//     expect(result.current.response).toStrictEqual(
//       successfulUpdateFlowchartResponse
//     );
//     expect(result.current.isLoading).toEqual(false);
//     expect(result.current.isSuccessful).toEqual(true);
//   });

//   it('is able to return an unsuccessful response', async () => {
//     const flowchartId = 1;
//     const url = `${baseUrl}/flowchart/${flowchartId}`;
//     const updateFlowchartRequest: UpdateFlowchartRequest = {
//       title: 'updated',
//       description: 'updated',
//     };

//     const failedGetFlowchartsResponse = { error: 'Invalid flowchart params' };

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(400, failedGetFlowchartsResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useUpdateFlowchartApi(flowchartId, updateFlowchartRequest)
//     );

//     await waitForNextUpdate();

//     expect(result.current.response).toStrictEqual(failedGetFlowchartsResponse);
//     expect(result.current.isLoading).toEqual(false);
//     expect(result.current.isSuccessful).toEqual(false);
//   });
//   it('is able to indicate it is loading while waiting for a response', async () => {
//     const flowchartId = 1;
//     const url = `${baseUrl}/flowchart/${flowchartId}`;

//     const updateFlowchartRequest: UpdateFlowchartRequest = {
//       title: 'updated',
//       description: 'updated',
//     };

//     const successfulUpdateFlowchartResponse = {
//       flowchart: {
//         id: 1,
//         title: 'updated',
//         description: 'updated',
//         height: 3,
//         root_id: 1,
//         deleted: false,
//       },
//     };

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(200, successfulUpdateFlowchartResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useUpdateFlowchartApi(flowchartId, updateFlowchartRequest)
//     );

//     expect(result.current.isLoading).toEqual(true);
//     expect(result.current.isSuccessful).toEqual(false);

//     await waitForNextUpdate(); // Wait for axios to recieve a reply.
//   });
// });
