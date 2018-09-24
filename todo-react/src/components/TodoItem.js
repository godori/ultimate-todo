import React, { Fragment } from 'react';
import styled, { css } from "styled-components";
import CheckedIcon from '../static/images/check.svg';
import TrashIcon from '../static/images/remove-btn.svg';
import { SingleDatePicker } from "react-dates";
import '../styles/todo-item-date-picker-overrides.css';
import moment from "moment";


const StyledTodoItem = styled.article`
  display: flex;
  align-items: center;
  height: 75px;
  padding: 19px 20px 17px;
  border-bottom: 1px solid #E8E8E8;
  font-family: SFCompactText, sans-serif;
`;

const Content = styled.div`
  flex-grow: 5;
  padding-right: 5px;
  color: #DDD;
`;

const WhatTodo = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #444;
  cursor: text;
  padding: 0;
  border: 0;
  ${props => props.completed && css`
    color: #B8B8B8;
    text-decoration: line-through;
  `}
  
  &:focus {
    outline: none;
  }
`;

const Date = styled.div`
  display: inline-flex;
  align-items: center;
  
  &:nth-of-type(2) {
    margin-left: 5px;
  }
  
  ${props => props.completed && css`
    color: #B8B8B8;
    text-decoration: line-through;
  `}
`;

const DateLabel = styled.span`
  display: inline;
  margin-right: 5px;
  font-size: 13px;
  color: #FD9A9A;

  ${props => props.completed && css`
    color: #B8B8B8;
    text-decoration: line-through;
  `}
`;

const PresetButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 15px 0;
`;

const PresetButton = styled.a`
  border: none;
  background-color: transparent;
  font-weight: 200;
  letter-spacing: -0.5px;
  ${props => props.isSelected && css`
    color: #0DA598;
    font-weight: 600;
  `}
  
  &:hover {
    color: #0DA598;
    transition: color 250ms ease;
  }
  
  &:focus {
    outline: none;
  }
`;


const TrashButton = styled.i`
  display: inline-block;
  width: 18px;
  height: 100%;
  color:#000;
  background-color: #BBB;
  mask: url(${TrashIcon}) no-repeat 50% 50%;
  mask-size: contain;
  ${props => props.completed && css`
    background-color: #FFE3E3;
  `}
`;

const CheckBox = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid #DDDDDD;
  text-align: center;
  background-color: transparent;
  margin-right: 15px;
  
  &:focus {
    outline: none;
  }

  &.active {
    border: none;
    background: #00FFE2 url(${CheckedIcon}) no-repeat center;
    background-size: 16px 11px;
  }
`;

class TodoItem extends React.Component {
  state = {
    startDateFocused: this.props.startDateAutoFocus,
    endDateFocused: this.props.endDateAutoFocus,
    presets: [
      { text: 'Today', date: moment() },
      { text: 'Tomorrow', date: moment().add(1, 'days') },
      { text: 'Next Week', date: moment().add(7, 'days') },
      { text: 'Next Month', date: moment().add(1, 'months') }
    ]
  };

  handleDateChange = (dateType, date) => {
    this.props.handleDateEdit(dateType, date)
  };

  handleFocusChange = (dateType, { focused }) => {
    switch (dateType) {
      case 'start':
        this.setState({ startDateFocused: focused });
        break;
      case 'end':
        this.setState({ endDateFocused: focused });
        break;
      default:
        return;
    }
    this.setState({ focused });
  };

  renderDatePresets = dateType => {
    const date = this.props[dateType];
    return (
      <PresetButtonContainer>
        {
          this.state.presets.map(preset => (
            <PresetButton
              key={preset.text}
              isSelected={moment(date).isSame(preset.date, 'date')}
              onClick={this.handleDateChange.bind(null, dateType, preset.date)}>
              {preset.text}
            </PresetButton>
          ))
        }
      </PresetButtonContainer>
    );
  };

  componentDidMount() {
    document.querySelector("input#todoItem").setAttribute("readonly", "readonly");
  }

  render() {
    const { whatTodo, status, startDate, endDate, handleCheck, handleTextEdit, handleDateEdit, handleRemove } = this.props;
    const isCompleted = status > 0;
    return (
      <Fragment>
        <StyledTodoItem>
          <CheckBox onClick={handleCheck} className={status === 1 && 'active'}/>
          <Content>
            <WhatTodo
              onChange={handleTextEdit}
              onBlur={handleTextEdit}
              completed={isCompleted}
              defaultValue={whatTodo}/>
            <Date>
              <DateLabel completed={isCompleted}>FROM</DateLabel>
              <SingleDatePicker
                date={moment(startDate)}
                renderCalendarInfo={this.renderDatePresets.bind(null, 'startDate')}
                displayFormat="YYYY-MM-DD"
                calendarInfoPosition="top"
                onDateChange={handleDateEdit.bind(null, 'startDate')}
                focused={this.state.startDateFocused}
                onFocusChange={this.handleFocusChange.bind(null, 'start')}
                numberOfMonths={1}
                monthFormat="YYYY. MM"
                weekDayFormat="ddd"
                horizontalMonthPadding={10}
                id={isCompleted ? 'todoItem-active' : 'todoItem'}/>
              <DateLabel completed={isCompleted}>TO</DateLabel>
              <SingleDatePicker
                date={moment(endDate)}
                renderCalendarInfo={this.renderDatePresets.bind(null, 'endDate')}
                calendarInfoPosition="top"
                displayFormat="YYYY-MM-DD"
                onDateChange={handleDateEdit.bind(null, 'endDate')}
                focused={this.state.endDateFocused}
                onFocusChange={this.handleFocusChange.bind(null, 'end')}
                numberOfMonths={1}
                monthFormat="YYYY. MM"
                weekDayFormat="ddd"
                horizontalMonthPadding={10}
                id={isCompleted ? 'todoItem-active' : 'todoItem'}/>
            </Date>
          </Content>
          <TrashButton completed={isCompleted} onClick={handleRemove}/>
        </StyledTodoItem>
      </Fragment>
    );
  }
}

TodoItem.defaultProps = {
  date: moment(),
  startDateAutoFocus: false,
  endDateAutoFocus: false
};

export default TodoItem;
