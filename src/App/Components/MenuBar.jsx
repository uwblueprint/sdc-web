import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  background: #2d2d2e;
  width: 100%;
  height: 103px;
  top: 0px;
  position: sticky;
  z-index: 1000;
`;

export default function MenuBar(props) {
  return <Menu />;
}
