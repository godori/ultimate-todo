import React from 'react';
import styled, { css } from "styled-components";


const Div = styled.div`
  position: relative;
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  ${props => props.isUnderOverlay && css`
    overflow: hidden;
  `}
`;


const Container = ({ overlayVisible, children }) => {
  return (
    <Div isUnderOverlay={overlayVisible}>
      {children}
    </Div>
  );
};

export default Container;
