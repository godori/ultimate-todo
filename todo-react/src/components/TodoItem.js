import React, { Component, Fragment } from 'react';

class TodoItem extends Component {
  render() {
    return (
      <Fragment>
        <li>
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