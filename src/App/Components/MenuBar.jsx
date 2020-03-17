import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import Icon from '../../assets/SocialDevelopmentCentre_Logo_WhiteOnBlack_1.png';

const IconSize = {
  height: 60,
  width: 'auto',
};

const DrawerWorkAround = {
  position: 'relative',
  zIndex: 1400,
};

const StyledToolbar = styled(Toolbar)`
  background-color: #2d2d2e;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

const StyledList = styled(List)`
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 64px;
  @media (max-width: 600px) {
    margin-top: 52px;
  }
`;

const StyledListItem = styled(ListItem)`
  background-color: #2d2d2e;
  color: #ffffff;
  text-align: center;

  &:hover {
    color: #000000;
  }
`;

export default function MenuBar(props) {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = () => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    state.top === true ? setState({ top: false }) : setState({ top: true });
  };

  const fullList = (side) => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <StyledList>
        {[
          'Homepage',
          'About Us',
          'Get Involved',
          'Get Informed',
          'Resource Directory',
        ].map((text, index) => (
          <StyledListItem button key={text}>
            <ListItemText primary={text} />
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  );

  return (
    <React.Fragment>
      <AppBar position="relative" style={DrawerWorkAround}>
        <StyledToolbar>
          <img src={Icon} style={IconSize} alt="" />
          <StyledIconButton edge="end" color="inherit" aria-label="menu">
            <Menu onClick={toggleDrawer()}></Menu>
            {/* <Menu onClick={toggleDrawer('top', true)}></Menu> */}
          </StyledIconButton>
        </StyledToolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer('top', false)}
      >
        {fullList('top')}
      </Drawer>
    </React.Fragment>
  );
}
