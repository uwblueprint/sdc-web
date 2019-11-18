import { useAxios } from './UseAxios';

export const useGetFlowchartNode = (flowchartNodeId) => {
  const urlPath = `/flowchart_node/${flowchartNodeId}`;
  return useAxios('GET', urlPath);
};

export const useUpdateFlowchartNode = (flowchartNodeId, updateContent) => {
  const urlPath = `/flowchart_node/${flowchartNodeId}`;
  return useAxios('PUT', urlPath, updateContent);
};

export const useSwapFlowchartNodes = (flowchartNodeId1, flowchartNodeId2) => {
  const urlPath = `/flowchart/${flowchartNodeId1}/${flowchartNodeId2}`;
  return useAxios('PUT', urlPath);
};

export const useDeleteFlowchartNode = (flowchartId) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios('DELETE', urlPath);
};
