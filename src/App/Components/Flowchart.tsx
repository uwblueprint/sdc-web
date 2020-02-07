import React from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';
// import
// import { useEffect } from 'react';
type MyProps = {
  flowchart_id: number;
  title: string;
  description: string;
  root_id: number;
};

export default function FlowChart(props: MyProps) {
  return (
    <div>
      {props.flowchart_id} {props.title} {props.description} {props.root_id}
    </div>
  );
}
