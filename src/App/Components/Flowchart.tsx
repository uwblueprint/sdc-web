import React, { useState } from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';
// import
// import { useEffect } from 'react';
type FlowChartProps = {
  flowchart_id: number;
  title: string;
  description: string;
  root_id: number;
  //children: React.ReactNode;
};

type FlowChartNode = {
  id: number;
  text: string;
  // header: string;
  // buttontext: string;
  // next_question: string;
  // child_id: number;
  // is_root: boolean;
  // flowchart_id: number;
};

export default function FlowChart(props: FlowChartProps) {
  return props;
}
