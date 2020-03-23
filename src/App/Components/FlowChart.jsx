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
  @media (max-width: 576px) {
    display: none;
  }
`;

const MobileBreadcrumb = styled(Grid)`
  text-align: center;
  @media (min-width: 576px) {
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
    // this.fetchParents(nodeId);
    // this.fetchParentNode(nodeId);
    // this.fetchNodes();
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { nodeId } = this.props.match.params;
    if (prevProps.match.params.nodeId !== nodeId) {
      // this.fetchNodes();
      // this.fetchParents(nodeId);
      // this.fetchParentNode(nodeId);
      this.fetchData();
    }
  }

  fetchParents(nodeId) {
    return getParents(nodeId)
      .then((parents) => parents)
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
    return getParent(nodeId)
      .then((parent) => {
        return parent;
      })
      .catch((e) => {
        if (e) {
          console.log(e);
        }
      });
  }

  fetchChildNodes(nodeId) {
    return getChildren(nodeId)
      .then((children) => {
        if (children.length > 0) {
          return children;
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

  fetchNextNode() {
    const { flowchartId } = this.props.match.params;
    const { nodeId } = this.props.match.params;
    if (flowchartId != null && nodeId == null) {
      return getFlowchart(flowchartId).then(
        ({ flowchart: { root_id } }) => root_id
      );
    } else if (flowchartId != null && nodeId != null) {
      return Promise.resolve(nodeId);
    }
  }

  fetchData() {
    this.fetchNextNode()
      .then((nodeId) => {
        console.log(nodeId);
        return Promise.all([
          this.fetchChildNodes(nodeId),
          this.fetchParentNode(nodeId),
          this.fetchParents(nodeId),
        ]);
      })
      .then((values) => {
        console.log(values);
        this.setState({
          flowchartNodes: values[0] || [],
          parentNode: values[1],
          parents: values[2] || [],
        });
      })
      .catch(({ response }) => {
        if (!response) {
          console.log('Error fetching flow charts');
        }
      });
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
            {this.isLastNode() && (
              <button onClick={() => this.routeToHome()}> Go Home </button>
            )}
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
