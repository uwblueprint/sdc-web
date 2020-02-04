import React from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';
// import { useEffect } from 'react';

type MyProps = {
  // message: string;
};

export default function View(props: MyProps) {
  const flowcharts = useGetFlowchartsApi();
  if (flowcharts.isLoading) {
    return <p>Loading</p>;
  }
  // console.log(flowcharts);
  const flowcharts_rendered = flowcharts.response.map((flowchart: JSON) => (
    <li>{JSON.stringify(flowcharts)}</li>
  ));

  return <div>{flowcharts_rendered}</div>;
}
