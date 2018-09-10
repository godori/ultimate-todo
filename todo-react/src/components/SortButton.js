import React, { Fragment } from 'react';
import styled from "styled-components";
import Icon from '../static/images/Sorting.svg';

const SortBtn = styled.button`
  margin-left: auto;
`;

const SortIcon = styled.i`
  display: inline-block;
  width: 20px;
  height: 15px;
  background: url(${Icon});
  background-size: cover;
`;

const SortButton = () => {
  return (
    <Fragment>
      <SortBtn>
        <SortIcon />
      </SortBtn>
    </Fragment>
  );
};

export default SortButton;
