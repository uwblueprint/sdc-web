import React from 'react';
import Card from './Card.jsx';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
  state = {
    flowcharts: ['hello'],
  }
  componentDidMount() {
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
    return flowcharts.map((flowchart) => {
      return <Card onClick={() => this.props.history.push("/flowchart/")} />
    });
  }
}
