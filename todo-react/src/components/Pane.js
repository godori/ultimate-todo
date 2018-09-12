import React, { Fragment } from 'react';
import styled from "styled-components";


const TabContainer = styled.li`
  display: inline-block;
  margin-right: 23px;
  font-family: "SF Compact Text", sans-serif;
  font-size: 16px;
  font-weight: 600;
  
  &:last-child {
    margin-right: 0;
  }
`;

const Inactivate = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #B8B8B8;
`;

const Activate = styled(Inactivate)`
  position: relative;
  color: #000000;
  &:after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    bottom: -15px;
    left: 0;
    border-bottom: 2px solid #000;
  }
`;

const Pane = ({ onClick, label, isActive }) => {
  return (
    <Fragment>
      <TabContainer>
        {
          isActive
          ? <Activate onClick={onClick}>{label}</Activate>
          : <Inactivate onClick={onClick}>{label}</Inactivate>
        }
      </TabContainer>
    </Fragment>
  );
};

export default Pane;
