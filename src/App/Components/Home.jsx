import React from 'react';
import Card from './Card.jsx';
import MenuBar from './MenuBar.jsx';
import { getFlowcharts } from '../../utils/FlowchartApi';
import styled from 'styled-components';

const Banner = styled.div`
  background: #09433C;
  padding: 40px 24px;
  // width: 375px;
  //height: 254px;
  left: 0px;
  top: 100px;
`;

const BoldedWord = styled.span`
  font-weight: bold;
`;

const HeaderTitle = styled.h1`
  position: static;
  width: 327px;
  height: 87px;
  left: 0px;
  top: 0px;
  color: #FFFFFF;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 1.5px;
`;

const CardQuestion = styled.h1`
  padding: 42px 24px;
  width: 375px;
  height: 58px;
  top: 399px;
  left: 16px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
`;

const HeaderDescription = styled.div`
  width: 327px;
  height: 69px;
  left: 0px;
  // top: 105px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  letter-spacing: 1.5px;
`;

const CardContainer = styled.div`

  top:499px;
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
        <MenuBar></MenuBar>
        {this.renderHeader()}
        {this.renderCards()}
      </div>
    );
  }

  renderHeader() {

    return (
      <Banner>
        <HeaderTitle>
          Welcome to the <BoldedWord>Social Development Center Waterloo Region.</BoldedWord>
        </HeaderTitle>
        <HeaderDescription>
          Information and training resource for community level social services and programs.
           </HeaderDescription>
      </Banner>

    );
  }



  renderCards() {
    const { flowcharts } = this.state;
    const { history } = this.props;
    return flowcharts.map((flowchart) => (

      <div>

        <CardQuestion>
          What type of information are you looking for?
        </CardQuestion>
        <CardContainer>
          <Card
            id={flowchart.id}
            title={flowchart.title}
            description={flowchart.description}
            onClick={() => history.push(`/flowchart/${flowchart.id}`)}
          />
        </CardContainer>

      </div>
    ));
  }
}
