import React from 'react';
import Card from './Card.jsx';
import { getFlowchart } from '../../utils/FlowchartApi';
import {
  getChildren,
  getParents,
  getParent,
} from '../../utils/FlowchartNodeApi';
import { Box } from '@material-ui/core';
import MenuBar from './MenuBar';
import { QuestionContainer, Question, Content } from './Home';

export default class FlowChart extends React.Component {
  state = {
    flowchartNodes: [],
    parents: [],
    parentNode: {},
  };

  componentDidMount() {
    const { nodeId } = this.props.match.params;
    this.fetchParents(nodeId);
    this.fetchParentNode(nodeId);
    this.fetchFlowchartNodes();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { nodeId } = this.props.match.params;
    if (prevProps.match.params.nodeId !== nodeId) {
      this.fetchFlowchartNodes();
      this.fetchParents(nodeId);
      this.fetchParentNode(nodeId);
    }
  }

  fetchParents(nodeId) {
    const { flowchartId } = this.props.match.params;
    return getFlowchart(flowchartId)
      .then((flowchart) =>
        getParents(nodeId || flowchart.flowchart.root_id).then((result) => {
          this.setState({ parents: result });
        })
      )
      .catch(({ response }) => {
        if (!response) {
          console.log('Error fetching flow charts');
        }
      });
  }

  goBack() {
    const { flowchartId } = this.props.match.params;
    if (this.state.parentNode !== null) {
      alert(this.state.parentNode.id);
      this.props.history.push(
        `/flowchart/${flowchartId}/node/${this.state.parentNode.id}`
      );
    } else {
      this.props.history.push('/');
    }
  }

  fetchParentNode(nodeId) {
    const { flowchartId } = this.props.match.params;
    return getFlowchart(flowchartId).then((flowchart) =>
      getParent(nodeId || flowchart.flowchart.root_id)
        .then((parent) => {
          this.setState({ parentNode: parent });
        })
        .catch((e) => {
          if (e) {
            console.log(e);
          }
        })
    );
  }
  isLastNode() {
    const {flowchartNodes} = this.state;
    return !flowchartNodes.some(({is_leaf}) => !is_leaf);
  }

  fetchChildNodes(nodeId) {
    return getChildren(nodeId)
    .then((children) => {
      if (children.length > 0) {
        this.setState({ flowchartNodes: children });
      } else {
        // Routed here due to error in data, must go back
        console.log("This node should be marked as a leaf");
        this.props.history.goBack();
      }
    })
    .catch(({response}) => {
      if (!response) {
        console.log('Error fetching flowchart nodes');
      }
    })
  }

  fetchFlowchartNodes() {
    const { flowchartId, nodeId } = this.props.match.params;
    if (flowchartId != null && nodeId == null) {
      getFlowchart(flowchartId)
      .then(({flowchart}) => {
        this.fetchChildNodes(flowchart.root_id);
      })
      .catch(({response}) => {
        if (!response) {
          console.log('Error fetching flow charts');
        }
      })
    } else if (flowchartId != null && nodeId != null) {
      this.fetchChildNodes(nodeId);
    }
  }

  routeToHome() {
    this.props.history.push('/');
  }

  routeToNextNode(nodeId) {
    const { flowchartId } = this.props.match.params;
    this.props.history.push(`/flowchart/${flowchartId}/node/${nodeId}`);
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Content>
          <div style={{ fontFamily: 'Arial' }}>
            <div>{this.renderBreadcrumbs()}</div>
            <button onClick={() => this.goBack()}>Previous Step</button>
            <div>{this.renderHeader()}</div>
            <div>{this.renderCards()}</div>
            {this.isLastNode() && <button onClick={() => this.routeToHome()}> Go Home </button>}
          </div>
        </Content>
      </div>
    );
  }

  renderBreadcrumbs() {
    const { parents } = this.state;
    const { flowchartId } = this.props.match.params;
    // console.log(parents);
    return parents.map((parent, index, arr) => {
      let suffix = '';
      let arrow = ' > ';
      if (index !== 0) {
        suffix = `/node/${parents[index - 1].id}`;
      }
      if (parents.length === 1 || parents.length === index + 1) {
        arrow = '';
      }
      return (
        <span
          key={index}
          onClick={() =>
            this.props.history.push(`/flowchart/${flowchartId}${suffix}`)
          }
        >
          {parent.next_question}
          {arrow}
        </span>
      );
    });
  }

  renderHeader() {
    const { flowchartNodes } = this.state;
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
    return flowchartNodes.map(({id, header, text, is_leaf}) =>  { 
      const onClick = is_leaf ? null : () => this.routeToNextNode(id);
      return (
      <Box key={id}>
        <Card
          id={id}
          title={header}
          description={text}
          onClick={onClick}
        />
      </Box>
    )
    });
  }
}
