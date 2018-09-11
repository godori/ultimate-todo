import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import Pane from "./Pane";

const StyledTabs = styled.ul`
  display: inline-flex;
  height: 100%;
  align-items: center;  
`;

class Tabs extends Component {
  state = {
    activatedPane: null
  };

  handlePaneClick = key => {
    this.setState({ activatedPane: key })
  };

  componentDidMount() {
    this.setState({ activatedPane: this.props.initialValue });
  }

  render() {
    return (
      <Fragment>
        <StyledTabs>
          {this.props.tabNames.map((tabName, key) => (
            <Pane key={key}
                  onClick={this.handlePaneClick.bind(null, key)}
                  isActive={this.state.activatedPane === key}
                  label={tabName}/>
          ))}
        </StyledTabs>
      </Fragment>
    );
  }
}

export default Tabs;