import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Content = styled.div`
  display: flex;
  min-height: 160px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(196, 196, 196, 0.75);
`;
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
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: 'right';
`;

const ArrowIcon = styled(ArrowForwardIosIcon)`
  width: 28px !important;
  height: 28px !important;
`;

export default class Card extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Content onClick={onClick}>
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
        {onClick && <ButtonDiv>
          <ArrowIcon />
        </ButtonDiv>}
      </Content>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};
