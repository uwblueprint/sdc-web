import useAxios from './UseAxios';

export const useGetFlowcharts = () => {
  const urlPath = '/flowchart/';
  return useAxios('GET', urlPath);
};

export const useGetFlowchart = (flowchartId) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios('GET', urlPath);
};

export const useUpdateFlowchart = (flowchartId, updateContent) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios('PUT', urlPath, updateContent);
};

export const useDeleteFlowchart = (flowchartId) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios('DELETE', urlPath);
};
