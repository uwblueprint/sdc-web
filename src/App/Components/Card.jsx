import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Title = styled.h1`
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: flex-end;
  letter-spacing: 0.01em;
  color: #09433c;
`;

const Description = styled.div`
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000000;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: 'right';
`;

export default class Card extends React.Component {
  render() {
    return (
      <div>
        {/* <Grid
          container
          spacing={3}
          style={{ height: '100%' }}
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={9}>
            <Title>{this.props.title}</Title>
            <Description>{this.props.description}</Description>
          </Grid>
          <Grid item xs={3} style={{ height: '50%' }}>
            <buttonDiv onClick={this.props.onClick}>
              <IconButton aria-label="next question">
                <ArrowForwardIosIcon color="primary" />
              </IconButton>
            </buttonDiv>
          </Grid>
        </Grid> */}
        <div
          style={{
            width: '80%',
            whitespace: 'nowrap',
            display: 'inline-block',
          }}
        >
          <Title>{this.props.title}</Title>
          <Description>{this.props.description}</Description>
        </div>
        <ButtonDiv onClick={this.props.onClick}>
          <IconButton aria-label="next question">
            <ArrowForwardIosIcon />
          </IconButton>
        </ButtonDiv>
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
