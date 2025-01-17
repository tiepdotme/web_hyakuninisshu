import React from 'react';
import styled from '@src/styles/styled-components';

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Container = styled.div(({ onClick }) => ({
  cursor: onClick ? 'pointer' : '',
}));

const Block: React.FC<Props> = ({ children, className = '', onClick }) => (
  <Container className={className} onClick={onClick}>
    {children}
  </Container>
);

export default Block;
