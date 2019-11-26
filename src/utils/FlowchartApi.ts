import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';

const baseUrl = process.env.REACT_APP_API_URL;

export const useGetFlowchartsApi = (): ApiHookResponse =>
  useAxios(HttpMethods.GET, `${baseUrl}/flowcharts`, null);

export const useGetFlowchartApi = (flowchartId: number): ApiHookResponse =>
  useAxios(HttpMethods.GET, `${baseUrl}/flowchart/${flowchartId}`, null);

export const useUpdateFlowchartApi = (
  flowchartId: number,
  updateContent: number
): ApiHookResponse =>
  useAxios(
    HttpMethods.PUT,
    `${baseUrl}/flowchart/${flowchartId}`,
    updateContent
  );

export const useDeleteFlowchartApi = (flowchartId: number): ApiHookResponse =>
  useAxios(HttpMethods.DELETE, `${baseUrl}/flowchart/${flowchartId}`, null);
