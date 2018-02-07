import * as React from 'react';
import styled from 'styled-components';
import { COLOR_PRIMARY } from '../../constants/colors';

const Root = styled.header`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  left: 0;
  right: 0;
  z-index: 1;
  position: fixed;
  background-color: ${COLOR_PRIMARY};
  padding-left: 16px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  width: 100%;
  color: white;
  line-height: 64px;
  margin: 0;
  font-weight: normal;
  text-align: left;
`;

const Header = () => (
  <Root>
    <Title>さくさく覚える百人一首</Title>
  </Root>
);

export default Header;
