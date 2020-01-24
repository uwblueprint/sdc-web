import React from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';

type MyProps = {
  message: string;
};

export default function FlowChart(props: MyProps) {
  const testString = useGetFlowchartsApi();
  return <div>{JSON.stringify(testString)}</div>;
}
