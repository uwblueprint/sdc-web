import React from 'react';
import Card from './Card.jsx';
import {getFlowcharts} from '../../utils/FlowchartApi';

export default class Home extends React.Component {
  state = {
    flowcharts: [],
  }
  componentDidMount() {
    getFlowcharts()
    .then(flowcharts => this.setState({flowcharts}))
    .catch(({response}) => {
      if (!response) console.log("Error fetching flow charts");
    });
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderCards()}
      </div>
    );
  }

  renderHeader() {
    return <div>Insert Title Text Here</div>;
  }

  renderCards() {
    const {flowcharts} = this.state;
    const {history} = this.props;
    return flowcharts.map((flowchart) => {
      return <Card key={flowchart.id} data={flowchart} onClick={() => history.push("/flowchart/")} />
    });
  }
}
