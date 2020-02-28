import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  background: #2D2D2E;
  width: 100%; //375px
  height: 103px;
  left: 0px;
  top: 0px;
`;

export default function MenuBar(props) {
  return (
    <div>
      <Menu></Menu>
    </div>
  );
}
