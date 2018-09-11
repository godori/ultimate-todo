import React from 'react';
import styled from "styled-components";


const Div = styled.div`
  position: relative;
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
`;


const Container = ({ children }) => {
  return (
    <Div>
      {children}
    </Div>
  );
};

export default Container;
