import { useAxios, ApiHookResponse } from './UseAxios';
import { HttpMethods } from './HttpMethods';
import { request } from './Api.js';

const baseUrl = `${process.env.REACT_APP_API_URL}/flowcharts`;

export const getFlowcharts = () => request(HttpMethods.GET, baseUrl, null);

export const getFlowchart = (flowchartId) => request(HttpMethods.GET, `${baseUrl}/${flowchartId}`, null);

export const updateFlowchart = (flowchartId, updateContent) => request(HttpMethods.PUT, `${baseUrl}/${flowchartId}`, updateContent);

export const deleteFlowchart = (flowchartId) => request(HttpMethods.DELETE, `${baseUrl}/${flowchartId}`, ) 

export const createFlowchart = (request) => request(HttpMethods.POST, baseUrl, request);
