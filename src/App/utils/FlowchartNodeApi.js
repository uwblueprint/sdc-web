import useAxios from './UseAxios';

getFlowchartNode = (flowchartNodeId) => {
  const urlPath = '/flowchart_node/' + flowchartNodeId;
  return useAxios('GET', urlPath);
};

updateFlowchartNode = (flowchartNodeId, updateContent) => {
  const urlPath = '/flowchart_node/' + flowchartNodeId;
  return useAxios('PUT', urlPath, updateContent);
};

swapFlowchartNodes = (flowchartNodeId1, flowchartNodeId2) => {
  const urlPath = '/flowchart/' + flowchartNodeId1 + '/' + flowchartNodeId2;
  return useAxios('PUT', urlPath);
};

deleteFlowchartNode = (flowchartId) => {
  const urlPath = '/flowchart/' + flowchartId;
  return useAxios('DELETE', urlPath);
};

export {
  getFlowchartNode,
  putFlowchartNode,
  swapFlowchartNodes,
  deleteFlowchartNode,
};
