// import React from 'react';
// import { useGetFlowchartNodeApi } from '../../utils/FlowchartNodeApi';

// export class FlowChartNodeComponent extends React.Component {
//   state =
//   componentDidMount() {
//     this.state = useGetFlowchartNodeApi(1);
//   }

//   render() {
//     return <div>{this.state}</div>;
//   }
// }

import React, { Component } from 'react';
import { useGetFlowchartNodeApi } from '../../utils/FlowchartNodeApi';
type MyProps = {
  // note that using an interface is also ok
  text: string;
  header: string;
  button_text: string;
  next_question: string;
  child_id: BigInt;
  is_root: boolean;
  flowchart_id: BigInt;
};

type MyState = {
  testString: Object;
};

export default function FlowChartNodeComponent(props: MyProps) {
  let testString = useGetFlowchartNodeApi(1);
  console.log(useGetFlowchartNodeApi(1));
  return <div>{props.text}</div>;
}

FlowChartNodeComponent.defaultProps = {
  text: 'default',
};
