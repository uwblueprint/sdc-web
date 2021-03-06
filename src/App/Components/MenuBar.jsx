import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import Icon from '../../assets/SocialDevelopmentCentre_Logo_WhiteOnBlack_1.png';

const IconSize = {
  marginTop: 10,
  height: 50,
  width: 'auto',
};

const DrawerWorkAround = {
  position: 'relative',
  zIndex: 1400,
  fontFamily: 'Arial',
};

const MobileToolbar = styled(Toolbar)`
  background-color: #2d2d2e;
  @media (min-width: 601px) {
    display: none;
  }
`;

const DesktopToolbar = styled(Grid)`
  background-color: #2d2d2e;
  padding: 0px 16px;
  @media (max-width: 601px) {
    display: none;
  }
`;

const DesktopToolbarItem = styled(Grid)``;
const MobileIconButton = styled(IconButton)`
  margin-left: auto;
`;

const MobileList = styled(List)`
  padding-top: 60px;
  padding-bottom: 0px;
  @media (max-width: 600px) {
    margin-top: 0px;
  }
`;

const MobileListItem = styled(ListItem)`
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
      <MobileList>
        {[
          {
            title: 'Homepage',
            link: 'http://www.waterlooregion.org/',
            openMethod: '_blank',
          },
          {
            title: 'About Us',
            link: 'http://www.waterlooregion.org/content/about-us',
            openMethod: '_blank',
          },
          {
            title: 'Get Involved',
            link: 'http://www.waterlooregion.org/community-development',
            openMethod: '_blank',
          },
          {
            title: 'Get Informed',
            link: 'http://www.waterlooregion.org/community-information',
            openMethod: '_blank',
          },
          {
            title: 'Resource Directory',
            link: 'https://www.wwhealthline.ca',
            openMethod: '_blank',
          },
        ].map((obj, index) => (
          <MobileListItem
            button
            key={obj.title}
            onClick={() => {
              window.open(obj.link, obj.openMethod);
            }}
          >
            <ListItemText primary={obj.title} />
          </MobileListItem>
        ))}
      </MobileList>
    </div>
  );

  const renderDesktopNav = () => {
    return [
      { title: 'Homepage', link: '/', openMethod: '_self' },
      {
        title: 'About Us',
        link: 'http://www.waterlooregion.org/content/about-us',
        openMethod: '_blank',
      },
      {
        title: 'Get Involved',
        link: 'http://www.waterlooregion.org/community-development',
        openMethod: '_blank',
      },
      {
        title: 'Get Informed',
        link: 'http://www.waterlooregion.org/community-information',
        openMethod: '_blank',
      },
      {
        title: 'Resource Directory',
        link: 'https://www.wwhealthline.ca',
        openMethod: '_blank',
      },
    ].map((obj, index) => (
      <DesktopToolbarItem
        container
        item
        justify="center"
        xs={2}
        onClick={() => {
          window.open(obj.link, obj.openMethod);
        }}
      >
        {obj.title}
      </DesktopToolbarItem>
    ));
  };

  return (
    <React.Fragment>
      <AppBar position="relative" style={DrawerWorkAround}>
        <MobileToolbar>
          <img
            button
            src={Icon}
            onClick={() => {
              window.open('http://www.waterlooregion.org/', '_blank');
            }}
            style={IconSize}
            alt=""
          />
          <MobileIconButton edge="end" color="inherit" aria-label="menu">
            <Menu onClick={toggleDrawer()}></Menu>
            {/* <Menu onClick={toggleDrawer('top', true)}></Menu> */}
          </MobileIconButton>
        </MobileToolbar>
        <DesktopToolbar container direction="row" alignItems="center">
          <Grid item sm={2} md={2} justify="center">
            <img
              src={Icon}
              onClick={() => {
                window.open('http://www.waterlooregion.org/', '_blank');
              }}
              style={IconSize}
              alt=""
            />
          </Grid>
          {renderDesktopNav()}
        </DesktopToolbar>
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
