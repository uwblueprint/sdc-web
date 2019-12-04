import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';

const baseUrl = process.env.REACT_APP_API_URL;

export interface SwapNodesRequest {
  id_a: number;
  id_b: number;
}

export interface CreateFlowchartNodeRequest {
  prev_id: number;
  is_child: boolean;
  text: string;
  header: string;
  button_text: string;
  next_question: string;
}

export interface UpdateFlowchartNodeRequest {
  text: string;
  header: string;
  button_text: string;
  next_question: string;
}

export const useGetFlowchartNodeApi = (
  flowchartNodeId: number
): ApiHookResponse =>
  useAxios(
    HttpMethods.GET,
    `${baseUrl}/flowchart_node/${flowchartNodeId}`,
    null
  );

export const useUpdateFlowchartNodeApi = (
  flowchartNodeId: number,
  request: UpdateFlowchartNodeRequest
): ApiHookResponse =>
  useAxios(
    HttpMethods.PUT,
    `${baseUrl}/flowchart_node/${flowchartNodeId}`,
    request
  );

export const useSwapFlowchartNodesApi = (
  request: SwapNodesRequest
): ApiHookResponse =>
  useAxios(HttpMethods.PUT, `${baseUrl}/flowchart_node/swap`, request);

export const useDeleteFlowchartNodeApi = (
  flowchartId: number
): ApiHookResponse =>
  useAxios(
    HttpMethods.DELETE,
    `${baseUrl}/flowchart_node/${flowchartId}`,
    null
  );

export const useCreateFlowchartNodeApi = (
  request: CreateFlowchartNodeRequest
): ApiHookResponse =>
  useAxios(HttpMethods.POST, `${baseUrl}/flowchart_node`, request);
