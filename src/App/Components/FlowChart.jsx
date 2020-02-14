import React from 'react';
import Card from './Card.jsx';
import { getFlowchart } from '../../utils/FlowchartApi';
import { getChildren } from '../../utils/FlowchartNodeApi';

export default class FlowChart extends React.Component {
  state = {
    flowchartNodes: [],
    isFirst: true,
  };
  componentDidMount() {
    if (this.state.isFirst) {
      getFlowchart(this.props.match.params.id)
        .then((flowchart) =>
          getChildren(flowchart.flowchart.root_id)
            .then((children) =>
              this.setState({ flowchartNodes: children, isFirst: false })
            )
            .catch(({ response }) => {
              if (!response) {
                console.log('Error fetching flowchart nodes');
              }
            })
        )
        .catch(({ response }) => {
          if (!response) {
            console.log('Error fetching flow charts');
          }
        });
    }
  }
  render() {
    // render the flow chart components here
    const { id } = this.props.match.params;
    return <div>{this.renderCards()}</div>;
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
        onClick={() =>
          getChildren(flowchartNode.id)
            .then((children) =>
              this.setState({ flowchartNodes: children, isFirst: false })
            )
            .catch(({ response }) => {
              if (!response) {
                console.log('Error fetching flowchart nodes');
              }
            })
        }
      />
    ));
  }
}
