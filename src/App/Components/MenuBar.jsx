import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const StyledToolbar = styled(Toolbar)`
  background-color: #2d2d2e;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

const StyledListItem = styled(ListItem)`
  text-align: center;
`;

export default function MenuBar(props) {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = (side) => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
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
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <AppBar position="relative">
        <StyledToolbar>
          <Typography variant="h6" noWrap>
            Social Development Centre
          </Typography>
          <StyledIconButton edge="end" color="inherit" aria-label="menu">
            <Menu onClick={toggleDrawer('top', true)}></Menu>
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
