import React, { Component } from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';

type MyProps = {
  message: string;
};

export default function FlowChart(props: MyProps) {
  let testString = useGetFlowchartsApi();
  console.log(useGetFlowchartsApi());
  return <div>{JSON.stringify(testString)}asdasd</div>;
}
