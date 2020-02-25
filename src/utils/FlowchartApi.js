// import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';
import { req } from './Api.js';

const baseUrl = `${process.env.REACT_APP_API_URL}/flowchart`;

export const getFlowcharts = () => req(HttpMethods.GET, `${baseUrl}s`, null);

export const getFlowchart = (flowchartId) =>
  req(HttpMethods.GET, `${baseUrl}/${flowchartId}`, null);

export const updateFlowchart = (flowchartId, updateContent) =>
  req(HttpMethods.PUT, `${baseUrl}/${flowchartId}`, updateContent);

export const deleteFlowchart = (flowchartId) =>
  req(HttpMethods.DELETE, `${baseUrl}/${flowchartId}`);

export const createFlowchart = (request) =>
  req(HttpMethods.POST, baseUrl, request);
