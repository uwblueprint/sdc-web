import React from 'react';
import Card from './Card.jsx';
import { getFlowchart } from '../../utils/FlowchartApi';
import { getChildren } from '../../utils/FlowchartNodeApi';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import MenuBar from './MenuBar';

export default class FlowChart extends React.Component {
  state = {
    flowchartNodes: []
  };

  componentDidMount() {
    const { nodeId } = this.props.match.params;
    this.fetchFlowchartNodes(nodeId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { nodeId } = this.props.match.params;
    if (prevProps.match.params.nodeId != nodeId) {
      this.fetchFlowchartNodes(nodeId);
    }
  }

  fetchFlowchartNodes(nodeId) {
    const { flowchartId } = this.props.match.params;
    return getFlowchart(flowchartId)
      .then((flowchart) =>
        getChildren(nodeId || flowchart.flowchart.root_id)
          .then((children) => {
            if (children.length > 0) {
              this.setState({ flowchartNodes: children });
              return true;
            }
            return false;
          })
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

  render() {
    // render the flow chart components here
    // const { id } = this.props.match.params;
    return (
      <Container maxWidth="sm">
        <MenuBar />
        <div style={{ fontFamily: 'Arial' }}>
          <div>{this.renderHeader()}</div>
          <div>{this.renderCards()}</div>
        </div>
      </Container>
    );
  }

  renderHeader() {
    const { flowchartNodes } = this.state;
    console.log(flowchartNodes[0]);
    return (
      <Box
        borderBottom={1}
        pb={4.2}
        pt={3.6}
        pl={1.6}
        pr={1.6}
        borderColor={(196, 196, 196, 0.75)}
      >
        <div style={{ fontSize: '25px' }}>
          {flowchartNodes.length !== 0 ? flowchartNodes[0].next_question : null}
        </div>
      </Box>
    );
  }

  renderCards() {
    const { flowchartNodes } = this.state;
    const { flowchartId } = this.props.match.params;

    console.log(flowchartNodes);
    return flowchartNodes.map((flowchartNode) => (
      <Box borderBottom={1} pt={2.4} pb={3.4} pl={2.4} pr={3.531}>
        <Card
          id={flowchartNode.id}
          title={flowchartNode.header}
          description={flowchartNode.text}
          onClick={() => {
            this.fetchFlowchartNodes(flowchartNode.id).
              then((success) => {
                if (success) {
                  this.props.history.push(`/flowchart/${flowchartId}/node/${flowchartNode.id}`);
                }
              });
          }}
        />
      </Box>
    ));
  }
}
