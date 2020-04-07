import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const NodeIconSize = {
  width: 48,
  height: 48,
  paddingTop: 16,
};

const NodeIconContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  grid-column-gap: 30px;
  margin-bottom: 13.4px;
`;

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
  white-space: pre-wrap;
  margin-bottom: 13.4px;
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
    let width = onClick ? '80%' : '100%';
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
            width: width,
            whitespace: 'nowrap',
            display: 'inline-block',
          }}
        >
          <Title>{this.props.title}</Title>
          <Description>{this.props.description}</Description>
          <div>{this.IconsExist(this.props.flowchart_icons)}</div>
        </div>
        {onClick && (
          <ButtonDiv>
            <ArrowIcon />
          </ButtonDiv>
        )}
      </Content>
    );
  }

  IconsExist(flowchart_icons) {
    if (flowchart_icons) {
      const icons = flowchart_icons.map((icon) => (
        <img key={icon.id} alt={icon.id} src={icon.url} style={NodeIconSize} />
      ));

      return <NodeIconContainer>{icons}</NodeIconContainer>;
    } else {
      return null;
    }
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  flowchart_icons: PropTypes.array,
};
