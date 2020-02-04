import React from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';
import FlowChart from './Flowchart';
// import { useEffect } from 'react';

type MyProps = {
  // message: string;
};

type Flowchart = {
  id: number;
  title: string;
  description: string;
  height: number;
  created_at: string;
  updated_at: string;
  root_id: number;
  deleted: boolean;
};

export default function View(props: MyProps) {
  const flowcharts = useGetFlowchartsApi();
  if (flowcharts.isLoading) {
    return <p>Loading</p>;
  }

  // console.log(flowcharts);
  const flowcharts_rendered = flowcharts.response.map(
    (flowchart: Flowchart) => (
      <div>
        <FlowChart
          flowchart_id={flowchart.id}
          title={flowchart.title}
          description={flowchart.description}
          root_id={flowchart.root_id}
        />
      </div>
    )
  );

  return <div>{flowcharts_rendered}</div>;
}
