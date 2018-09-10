import React, { Fragment } from 'react';
import styled from "styled-components";


const StyledButton = styled.button`
  
`;

const Button = (props) => {
  return (
    <Fragment>
      <StyledButton {...props} />
    </Fragment>
  );
};

export default Button;
