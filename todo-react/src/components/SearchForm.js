import React, { Fragment } from 'react';
import styled from 'styled-components';
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

const SearchIcon = styled(IconDefault)`
  margin-right: 16px;
  background: url(${SearchIconSVG}) no-repeat;
`;

const DeleteIcon = styled(IconDefault)`
  background: url(${XCircleIconSVG}) no-repeat;
`;

const SearchInput = styled.span`
  display: inline-block;
  width: 100%;
  font-family: SFCompactText, sans-serif;
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

  _input = '';

  clearInputField = () => {
    this.props.handleSearch('');
    this._input.textContent = '';
  };

  handleInput = event => {
    const ESC = 27;
    const ENTER = 13;
    const { keyCode, currentTarget } = event;
    const { textContent } = currentTarget;
    switch (keyCode) {
      case ESC:
        this.props.handleSearch('');
        this.clearInputField();
        currentTarget.blur();
        return;
      case ENTER:
        event.preventDefault();
        return;
      default:
        this.props.handleSearch(textContent);
        return;
    }
  };

  render() {
    return (
      <Fragment>
        <Form name="search">
          <SearchIcon/>
          <SearchInput
            onKeyUp={this.handleInput}
            onKeyDown={this.handleInput}
            ref={ref => this._input = ref}
            contentEditable
            placeholder="Search for tasks"/>
          <DeleteIcon onClick={this.clearInputField}/>
        </Form>
      </Fragment>
    );
  }
}

export default SearchForm;
