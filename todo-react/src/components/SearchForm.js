import React, { Fragment } from 'react';
import styled from "styled-components";
import SearchIconSVG from '../static/images/search-icon.svg';
import XCircleIconSVG from '../static/images/x-circle.svg';

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 15px;
  padding: 10px;
  height: 35px;
  border: 1px solid #E8E8E8;
  border-radius: 5px;
  
  &:focus-within {
    border: 1px solid rgba(0, 255, 227, .5);
  }
`;

const IconDefault = styled.i`
  display: inline-block;
  width: 15px;
  height: 15px;
  background-size: cover;
`;

const SearchIcon = IconDefault.extend`
  margin-right: 16px;
  background: url(${SearchIconSVG}) no-repeat;
`;

const DeleteIcon = IconDefault.extend`
  background: url(${XCircleIconSVG}) no-repeat;
`;

const SearchInput = styled.span`
  display: inline-block;
  width: 100%;
  font-family: "SF Compact Text", sans-serif;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.5px;
  
  &:empty:before {
    content: attr(placeholder);
    font-size: 16px;
    color: #D8D8D8;
  }
  
  &:focus {
    outline: none;
  }
  
  &:empty + i {
    display: none;
  }
`;

class SearchForm extends React.Component {

  input = null;

  clearInputField = () => {
    this.input.textContent = '';
  };

  handleInput = event => {
    const ESC = 27;
    const ENTER = 13;
    const { keyCode, currentTarget } = event;
    const { textContent } = currentTarget;

    switch (keyCode) {
      case ESC:
        this.clearInputField();
        this.props.searchHandler('');
        currentTarget.blur();
        return;
      case ENTER:
        event.preventDefault();
        return;
      default:
        textContent && this.props.searchHandler(textContent);
    }
  };

  render() {
    return (
      <Fragment>
        <Form name="search">
          <SearchIcon/>
          <SearchInput
            onKeyDown={this.handleInput}
            onKeyUp={this.handleInput}
            innerRef={component => this.input = component}
            contentEditable="true"
            placeholder="Search for tasks"/>
          <DeleteIcon onClick={this.clearInputField}/>
        </Form>
      </Fragment>
    );
  }
}

export default SearchForm;
