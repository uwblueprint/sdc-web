import useAxios from "./UseAxios"

getFlowcharts = () => {
    const urlPath = '/flowchart/';
    return useAxios("GET", urlPath);
};

getFlowchart = (flowchartId) => {
    const urlPath = '/flowchart/' + flowchartId;
    return useAxios("GET", urlPath);
}

updateFlowchart = (flowchartId, updateContent) => {
    const urlPath = '/flowchart/' + flowchartId;
    return useAxios("PUT", urlPath, updateContent);
}

deleteFlowchart = (flowchartId) => {
    const urlPath = '/flowchart/' + flowchartId;
    return useAxios("DELETE", urlPath);
}

export {
    getFlowcharts,
    getFlowchart,
    putFlowchart,
    deleteFlowchart
}
