import React from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';

type MyProps = {
  message: string;
};

export default function View(props: MyProps) {
  const flowcharts = useGetFlowchartsApi().response;

  const flowcharts_rendered = flowcharts.map((flowchart: JSON) => (
    <li>{flowchart}</li>
  ));

  return flowcharts_rendered;
}
