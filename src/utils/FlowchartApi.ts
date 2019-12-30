import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';

const baseUrl = process.env.REACT_APP_API_URL;

export interface CreateFlowchartRequest {
  title: string;
  description: string;
  height: 0;
}

export interface UpdateFlowchartRequest {
  title: string;
  description: string;
}

export const useGetFlowchartsApi = (): ApiHookResponse =>
  useAxios(HttpMethods.GET, `${baseUrl}/flowcharts`, null);

export const useGetFlowchartApi = (flowchartId: number): ApiHookResponse =>
  useAxios(HttpMethods.GET, `${baseUrl}/flowchart/${flowchartId}`, null);

export const useUpdateFlowchartApi = (
  flowchartId: number,
  updateContent: UpdateFlowchartRequest
): ApiHookResponse =>
  useAxios(
    HttpMethods.PUT,
    `${baseUrl}/flowchart/${flowchartId}`,
    updateContent
  );

export const useDeleteFlowchartApi = (flowchartId: number): ApiHookResponse =>
  useAxios(HttpMethods.DELETE, `${baseUrl}/flowchart/${flowchartId}`, null);

export const useCreateFlowchartApi = (
  request: CreateFlowchartRequest
): ApiHookResponse =>
  useAxios(HttpMethods.POST, `${baseUrl}/flowchart`, request);
