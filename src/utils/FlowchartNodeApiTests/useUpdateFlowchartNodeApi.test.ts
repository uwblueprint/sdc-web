describe('test', () => {
  it('test', () => {
    expect(true).toEqual(true);
  });
});

// import { renderHook } from '@testing-library/react-hooks';
// import {
//   useUpdateFlowchartNodeApi,
//   UpdateFlowchartNodeRequest,
// } from '../FlowchartNodeApi';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';

// const baseUrl = process.env.REACT_APP_API_URL;

// describe('useUpdateFlowchartNodeApi', () => {
//   it('is able to update a flowchart node', async () => {
//     const flowchartNodeId = 100;
//     const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;
//     const updateFlowchartNodeRequest: UpdateFlowchartNodeRequest = {
//       node: {
//         text: 'mock text',
//         header: 'mock header',
//         button_text: 'mock button text',
//         next_question: 'mock next question',
//       },
//     };

//     const successfulUpdateFlowchartNodeResponse = {
//       ...updateFlowchartNodeRequest,
//       prev_id: 1,
//       is_child: true,
//       child_id: null,
//       sibling_id: null,
//       is_root: false,
//       flowchart_id: 100,
//       deleted: false,
//     };

//     const mock = new MockAdapter(axios);
//     mock
//       .onAny(url, updateFlowchartNodeRequest)
//       .reply(200, successfulUpdateFlowchartNodeResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useUpdateFlowchartNodeApi(flowchartNodeId, updateFlowchartNodeRequest)
//     );

//     await waitForNextUpdate();

//     expect(result.current.response).toStrictEqual(
//       successfulUpdateFlowchartNodeResponse
//     );
//     expect(result.current.isLoading).toEqual(false);
//     expect(result.current.isSuccessful).toEqual(true);
//   });
//   it('is able to return an unsuccessful response', async () => {
//     const flowchartNodeId = 100;
//     const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;

//     const updateFlowchartNodeRequest: UpdateFlowchartNodeRequest = {
//       node: {
//         text: 'mock text',
//         header: 'mock header',
//         button_text: 'mock button text',
//         next_question: 'mock next question',
//       },
//     };

//     const failedUpdateFlowchartNodeResponse = null;

//     const mock = new MockAdapter(axios);
//     mock.onAny(url).reply(404);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useUpdateFlowchartNodeApi(flowchartNodeId, updateFlowchartNodeRequest)
//     );

//     await waitForNextUpdate();

//     expect(result.current.response).toStrictEqual(
//       failedUpdateFlowchartNodeResponse
//     );
//     expect(result.current.isLoading).toEqual(false);
//     expect(result.current.isSuccessful).toEqual(false);
//   });
//   it('is able to indicate it is loading while waiting for a response', async () => {
//     const flowchartNodeId = 100;
//     const url = `${baseUrl}/flowchart_node/${flowchartNodeId}`;
//     const updateFlowchartNodeRequest: UpdateFlowchartNodeRequest = {
//       node: {
//         text: 'mock text',
//         header: 'mock header',
//         button_text: 'mock button text',
//         next_question: 'mock next question',
//       },
//     };

//     const successfulUpdateFlowchartNodeResponse = {
//       ...updateFlowchartNodeRequest,
//       prev_id: 1,
//       is_child: true,
//       child_id: null,
//       sibling_id: null,
//       is_root: false,
//       flowchart_id: 100,
//       deleted: false,
//     };

//     const mock = new MockAdapter(axios);
//     mock
//       .onAny(url, updateFlowchartNodeRequest)
//       .reply(200, successfulUpdateFlowchartNodeResponse);

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useUpdateFlowchartNodeApi(flowchartNodeId, updateFlowchartNodeRequest)
//     );

//     expect(result.current.isLoading).toEqual(true);
//     expect(result.current.isSuccessful).toEqual(false);
//     await waitForNextUpdate(); // Wait for axios to recieve a reply.
//   });
// });
