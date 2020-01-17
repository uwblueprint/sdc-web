import React, { Component } from 'react';
import { useGetFlowchartsApi } from '../../utils/FlowchartApi';
type MyProps = {
  // note that using an interface is also ok
  message: string;
};

type MyState = {
  testString: Object;
};

export default class FlowChart extends Component<MyProps, MyState> {
  state: MyState = {
    testString: { testKey: 'testValue' },
  };

  componentDidMount() {
    this.setState({ testString: useGetFlowchartsApi() });
  }

  render() {
    return <div>{this.state.testString}</div>;
  }
}
