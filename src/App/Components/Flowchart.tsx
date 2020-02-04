import React from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';
// import { useEffect } from 'react';
type MyProps = {
  message: string;
};

export default function FlowChart(props: MyProps) {
  const testString = useFlowchart;
  // useEffect(() => {
  //   testString = useFlowchart;
  // });
  return <div>{JSON.stringify(testString)}</div>;
}

function useFlowchart() {
  const testString = useGetFlowchartsApi();
  // console.log(testString);
}
