import React, { Fragment } from 'react';

const TodoList = ({ children }) => {
  return (
    <Fragment>
      <ul>
        {children}
      </ul>
    </Fragment>
  );
};

export default TodoList;
