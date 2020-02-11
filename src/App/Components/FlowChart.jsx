import React from 'react';
export default class FlowChart extends React.Component {
  render() {
    // render the flow chart components here
    const { id } = this.props.match.params;
    return <div>{id}</div>;
  }
}
