import React, { Fragment } from 'react';
import styled from "styled-components";
import Icon from '../static/images/Sorting.svg';

const SortBtn = styled.button`
  float: right;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const SortIcon = styled.i`
  display: inline-block;
  width: 20px;
  height: 15px;
  background: ${props => props.sortType === 'desc' ? '#FD9A9A' : '#222'};
  mask: url(${Icon});
  mask-size: cover;
  cursor: pointer;
`;

const SortButton = ({ sortType, onClick }) => {
  return (
    <Fragment>
      <SortBtn>
        <SortIcon sortType={sortType} onClick={onClick}/>
      </SortBtn>
    </Fragment>
  );
};

export default SortButton;
