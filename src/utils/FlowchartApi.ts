import { useAxios } from './UseAxios';
import { HttpMethods } from './HttpMethods';

export const useGetFlowchartsApi = () => {
  const urlPath = '/flowchart/';
  return useAxios(HttpMethods.GET, urlPath, null);
};

export const useGetFlowchartApi = (flowchartId: number) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios(HttpMethods.GET, urlPath, null);
};

export const useUpdateFlowchartApi = (
  flowchartId: number,
  updateContent: number
) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios(HttpMethods.PUT, urlPath, updateContent);
};

export const useDeleteFlowchartApi = (flowchartId: number) => {
  const urlPath = `/flowchart/${flowchartId}`;
  return useAxios(HttpMethods.DELETE, urlPath, null);
};
