import React from 'react';
import Card from './Card.jsx';
// add the flowchartnode api

export default class FlowChart extends React.Component {
  state = {
    flowchartNodes: [
      { id: 1, text: 'node text', header: 'this is a fake node' },
    ],
  };
  componentDidMount() {
    //api stuff here
  }
  render() {
    // render the flow chart components here
    const { id } = this.props.match.params;
    return (
      <div>
        {this.renderHeader()} {this.renderCards()}
      </div>
    );
  }

  renderHeader() {
    const { flowchartNodes } = this.state;
    return <div>{flowchartNodes[0].header}</div>;
  }

  renderCards() {
    const { flowchartNodes } = this.state;
    return flowchartNodes.map((flowchartNode) => (
      <Card
        id={flowchartNode.id}
        title={flowchartNode.title}
        description={flowchartNode.text}
        onClick={() => this.setState({ flowcharNodes: [] })} //change this
      />
    ));
  }
}
