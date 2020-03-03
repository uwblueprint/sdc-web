import React from 'react';
import Card from './Card.jsx';
import { getFlowchart } from '../../utils/FlowchartApi';
import { getChildren } from '../../utils/FlowchartNodeApi';
import { Box } from '@material-ui/core';
import MenuBar from './MenuBar';
import { QuestionContainer, Question, Content } from './Home';

export default class FlowChart extends React.Component {
  state = {
    flowchartNodes: [],
  };

  componentDidMount() {
    const { nodeId } = this.props.match.params;
    this.fetchFlowchartNodes(nodeId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { nodeId } = this.props.match.params;
    if (prevProps.match.params.nodeId !== nodeId) {
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
      <div>
        <MenuBar />
        <Content>
          <div style={{ fontFamily: 'Arial' }}>
            <div>{this.renderHeader()}</div>
            <div>{this.renderCards()}</div>
            <button onClick={this.props.history.goBack}>GO BACK!!</button>
          </div>
        </Content>
      </div>
    );
  }

  renderHeader() {
    const { flowchartNodes } = this.state;
    console.log(flowchartNodes[0]);
    return (
      <QuestionContainer>
        <Question>
          {flowchartNodes.length !== 0 ? flowchartNodes[0].next_question : null}
        </Question>
      </QuestionContainer>
    );
  }

  renderCards() {
    const { flowchartNodes } = this.state;
    const { flowchartId } = this.props.match.params;

    console.log(flowchartNodes);
    return flowchartNodes.map((flowchartNode) => (
      <Box key={flowchartNode.id}>
        <Card
          id={flowchartNode.id}
          title={flowchartNode.header}
          description={flowchartNode.text}
          onClick={() => {
            this.fetchFlowchartNodes(flowchartNode.id).then((success) => {
              if (success) {
                this.props.history.push(
                  `/flowchart/${flowchartId}/node/${flowchartNode.id}`
                );
              }
            });
          }}
        />
      </Box>
    ));
  }
}
