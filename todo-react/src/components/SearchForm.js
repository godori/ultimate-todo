import React, { Fragment } from 'react';
import styled from "styled-components";
import Icon from '../static/images/search-icon.svg';

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 15px 10px 10px 15px;
  padding: 10px;
  height: 35px;
  border: 1px solid #E8E8E8;
  border-radius: 5px
`;

const SearchIcon = styled.i`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 16px;
  background: url(${Icon});
  background-size: cover;
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
    outline: 1px solid rgba(0, 255, 227, .5);
  }
`;

class SearchForm extends React.Component {

  inputBox = null;

  render() {
    return (
      <Fragment>
        <Form name="search">
          <SearchIcon/>
          <SearchInput
            onKeyDown={this.props.onChange.bind(this)}
            ref={ref => this.inputBox = ref}
            contentEditable="true"
            placeholder="Search for tasks"/>
        </Form>
      </Fragment>
    )
  }
}

export default SearchForm;
