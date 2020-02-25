// import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';
import { req } from './Api.js';

const baseUrl = `${process.env.REACT_APP_API_URL}/flowchart_node`;

export const getFlowchartNode = (flowchartNodeId) =>
  req(HttpMethods.GET, `${baseUrl}/${flowchartNodeId}`, null);

export const updateFlowchartNode = (flowchartNodeId, request) =>
  req(HttpMethods.PUT, `${baseUrl}/${flowchartNodeId}`, request);

export const swapFlowchartNode = (request) =>
  req(HttpMethods.PUT, `${baseUrl}/swap`, request);

export const deleteFlowchartNode = (flowchartNodeId) =>
  req(HttpMethods.DELETE, `${baseUrl}/${flowchartNodeId}`, null);

export const createFlowchartNode = (request) =>
  req(HttpMethods.POST, `${baseUrl}`, request);

export const getChildren = (flowchartNodeId) =>
  req(HttpMethods.GET, `${baseUrl}/${flowchartNodeId}/children`, null);
