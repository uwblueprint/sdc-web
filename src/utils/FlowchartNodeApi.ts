import { useAxios } from './UseAxios';
import { HttpMethods } from './HttpMethods';

export const useGetFlowchartNodeApi = (flowchartNodeId: number) => {
  const urlPath = `/flowchart_node/${flowchartNodeId}`;
  return useAxios(HttpMethods.GET, urlPath, null);
};

export const useUpdateFlowchartNodeApi = (
  flowchartNodeId: number,
  updateContent: number
) => {
  const urlPath = `/flowchart_node/${flowchartNodeId}`;
  return useAxios(HttpMethods.PUT, urlPath, updateContent);
};

export const useSwapFlowchartNodesApi = (
  flowchartNodeId1: number,
  flowchartNodeId2: number
) => {
  const urlPath = `/flowchart/${flowchartNodeId1}/${flowchartNodeId2}`;
  return useAxios(HttpMethods.PUT, urlPath, null);
};

export const useDeleteFlowchartNodeApi = (flowchartId: number) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios(HttpMethods.DELETE, urlPath, null);
};
