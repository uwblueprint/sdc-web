import React from 'react';
import Card from './Card.jsx';
import MenuBar from './MenuBar.jsx';
import { getFlowcharts } from '../../utils/FlowchartApi';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { FooterContainer } from './FlowChart';
import Contact from './Contact';

const Banner = styled.div`
  background: #09433c;
  padding: 36px 20px;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const BoldedWord = styled.span`
  font-weight: bold;
`;

const HeaderTitle = styled.div`
  left: 0px;
  color: #ffffff;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 1px;
  padding-bottom: 18px;
  @media (min-width: 600px) {
    margin-left: 10%;
    margin-right: 10%;
  }
`;
export const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 142px;
  border-bottom: 1px solid rgba(196, 196, 196, 0.75);
`;
export const Question = styled.h1`
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
  margin: 0;
`;

const HeaderDescription = styled.div`
  left: 0px;
  font-family: Arial;
  font-weight: 100;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
  letter-spacing: 1px;
  @media (min-width: 600px) {
    margin-left: 10%;
    margin-right: 10%;
  }
`;

export const Content = styled.div`
  padding: 0 16px 0 16px;
  @media (min-width: 600px) {
    margin-left: 10%;
    margin-right: 10%;
  }
`;

export default class Home extends React.Component {
  state = {
    flowcharts: [],
  };
  componentDidMount() {
    getFlowcharts()
      .then((flowcharts) => this.setState({ flowcharts }))
      .catch(({ response }) => {
        if (!response) {
          console.log('Error fetching flow charts');
        }
      });
  }
  render() {
    return (
      <div>
        <MenuBar />
        <div>
          {this.renderHeader()}
          <Content>
            {this.renderQuestion()}
            {this.renderCards()}
            {this.renderFooter()}
          </Content>
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <Banner>
        <HeaderTitle>
          Welcome to the{' '}
          <BoldedWord>Social Development Centre Waterloo Region.</BoldedWord>
        </HeaderTitle>
        <HeaderDescription>
          The Social Development Center is a learning organization whose vision
          is to ensure fair and equal access to social, economic and political
          life for everyone in the Waterloo Region.
        </HeaderDescription>
      </Banner>
    );
  }

  renderQuestion() {
    return (
      <QuestionContainer>
        <Question>What type of information are you looking for?</Question>
      </QuestionContainer>
    );
  }

  renderCards() {
    const { flowcharts } = this.state;
    const { history } = this.props;
    return flowcharts.map((flowchart) => (
      <Box key={flowchart.id}>
        <Card
          id={flowchart.id}
          title={flowchart.title}
          description={flowchart.description}
          onClick={() => history.push(`/flowchart/${flowchart.id}`)}
        />
      </Box>
    ));
  }

  renderFooter() {
    return (
      <FooterContainer>
        <Contact />
      </FooterContainer>
    );
  }
}
