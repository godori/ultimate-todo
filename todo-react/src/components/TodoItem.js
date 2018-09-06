import React, { Component, Fragment } from 'react';
import styled from "styled-components";


const StyledCheckBox = styled.input`
    
`;

class TodoItem extends Component {
  render() {
    return (
      <Fragment>
        <li>
          <StyledCheckBox onChange={this.props.onChange.call(null, this.props)} type="checkbox" />
          {this.props.whatTodo}
        </li>
      </Fragment>
    );
  }
}

TodoItem.defaultProps = {
  whatTodo: 'TEST'
};

export default TodoItem;