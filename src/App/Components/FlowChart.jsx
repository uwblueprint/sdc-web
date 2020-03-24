import React from 'react';
import Card from './Card.jsx';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { getFlowchart } from '../../utils/FlowchartApi';
import {
  getParent,
  getParents,
  getChildren,
} from '../../utils/FlowchartNodeApi';
import { Box, Divider } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import MenuBar from './MenuBar';
import { QuestionContainer, Question, Content } from './Home';

const DesktopBreadcrumbs = styled(Grid)`
  padding-top: 30px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileBreadcrumb = styled(Grid)`
  text-align: center;
  @media (min-width: 600px) {
    display: none;
  }
`;

const MobileBreadcrumbItems = styled(Grid)`
  padding: 30px 0px;
  text-decoration: underline;
`;

const StyledArrowBackIos = styled(ArrowBackIos)`
  font-size: 16px;
`;

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
  isLastNode() {
    const { flowchartNodes } = this.state;
    return !flowchartNodes.some(({ is_leaf }) => !is_leaf);
  }

  fetchRootNode(flowchartId) {
    return getFlowchart(flowchartId)
      .then(({ flowchart }) => {
        return this.fetchNode(flowchart.root_id);
      })
      .catch(({ response }) => {
        if (!response) {
          console.log('Error fetching flow charts');
        }
      });
  }

  goBack() {
    const { flowchartId } = this.props.match.params;
    if (this.state.parentNode !== null) {
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

  fetchChildNodes(nodeId) {
    return getChildren(nodeId)
      .then((children) => {
        if (children.length > 0) {
          this.setState({ flowchartNodes: children });
        } else {
          // Routed here due to error in data, must go back
          console.log('This node should be marked as a leaf');
          this.props.history.goBack();
        }
      })
      .catch(({ response }) => {
        if (!response) {
          console.log('Error fetching flowchart nodes');
        }
      });
  }

  fetchFlowchartNodes() {
    const { flowchartId, nodeId } = this.props.match.params;
    if (flowchartId != null && nodeId == null) {
      getFlowchart(flowchartId)
        .then(({ flowchart }) => {
          this.fetchChildNodes(flowchart.root_id);
        })
        .catch(({ response }) => {
          if (!response) {
            console.log('Error fetching flow charts');
          }
        });
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
            <MobileBreadcrumb container justify="space-evenly">
              <MobileBreadcrumbItems item xs={5}>
                <div onClick={() => this.goBack()}>
                  <StyledArrowBackIos />
                  Previous Step
                </div>
              </MobileBreadcrumbItems>
              <Divider orientation="vertical" flexItem />
              <MobileBreadcrumbItems item xs={5}>
                <div onClick={() => this.routeToHome()}>Homepage</div>
              </MobileBreadcrumbItems>
            </MobileBreadcrumb>
            <Divider />

            <DesktopBreadcrumbs>{this.renderBreadcrumbs()}</DesktopBreadcrumbs>
            <div>{this.renderHeader()}</div>
            <div>{this.renderCards()}</div>
            {/* {this.isLastNode() && (
              <button onClick={() => this.routeToHome()}> Go Home </button>
            )} */}
          </div>
        </Content>
      </div>
    );
  }

  renderBreadcrumbs() {
    const { parents } = this.state;
    const { flowchartId } = this.props.match.params;
    return parents.map((parent, index, arr) => {
      let suffix = '';
      let arrow = '  >  ';
      if (index !== 0) {
        suffix = `/node/${parents[index - 1].id}`;
      }
      if (parents.length === 1 || parents.length === index + 1) {
        arrow = null;
      }
      return (
        <span
          key={index}
          onClick={() =>
            this.props.history.push(`/flowchart/${flowchartId}${suffix}`)
          }
        >
          <span style={{ textDecoration: 'underline' }}>
            {parent.next_question}
          </span>
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
    return flowchartNodes.map(({ id, header, text, is_leaf }) => {
      const onClick = is_leaf ? null : () => this.routeToNextNode(id);
      return (
        <Box key={id}>
          <Card id={id} title={header} description={text} onClick={onClick} />
        </Box>
      );
    });
  }
}
