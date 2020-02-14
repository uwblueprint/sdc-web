import React from 'react';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.title} {this.props.description}
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};
