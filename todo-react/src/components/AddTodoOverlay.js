import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import '../styles/date-picker-overrides.css';
import closeButtonImage from '../static/images/x.svg';
import moment from "moment";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: ${props => props.visible ? 'block' : 'none'};
`;

const InnerWrapper = styled.main`
  position: relative;
  display: block;
  width: 85vw;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  top: 30px;
  right: -7px;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  
  &:hover {
    filter: drop-shadow(1px 1px 2px rgba(0,255,226,.8)); 
  }
  
  &:focus {
    outline: none;
  }
`;

const CloseButtonIcon = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #00FFE2;
  mask: url(${closeButtonImage});
  mask-size: cover;
`;

const Form = styled.form`
  display: block;
  width: 100%;
  font-family: SFCompactText, sans-serif;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  border-bottom: solid 2px #00ffe2;
  padding-bottom: 12px;
`;

const InnerFormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 28px;
  color: #00FFE2;
  font-size: 14px;
  font-weight: 300;  
`;

const Input = styled.input`
  flex-grow: 4;
  border: none;
  font-weight: 500;
  font-size: 14px;
  color: #FFF;
  background: transparent;
  
  &::placeholder {
    color: #696969;
  }
  
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-weight: 600;
  color: #00FFE2;
  border: none;
  background: none;
  font-size: 14px;
  padding: 0;
  
  &:focus {
    outline: none;
  }
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

class AddTodoOverlay extends Component {

  _input = null;

  state = {
    focused: this.props.autoFocus,
    date: this.props.initialDate,
    presets: [
      { text: 'Today', date: moment() },
      { text: 'Tomorrow', date: moment().add(1, 'days') },
      { text: 'Next Week', date: moment().add(7, 'days') },
      { text: 'Next Month', date: moment().add(1, 'months') }
    ]
  };

  handleFormClick = e => {
    e.stopPropagation();
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleFocusChange = ({ focused }) => {
    this.setState({ focused });
  };

  renderDatePresets = () => {
    return (
      <PresetButtonContainer>
        {
          this.state.presets.map(preset => (
            <PresetButton
              key={preset.text}
              isSelected={this.state.date.isSame(preset.date, 'date')}
              onClick={this.handleDateChange.bind(null, preset.date)}>
              {preset.text}
            </PresetButton>
          ))
        }
      </PresetButtonContainer>
    );
  };

  componentWillMount() {
    document.addEventListener('keydown', e => {
      e.keyCode === 27 && this.props.onClose();
    });
  }

  componentDidMount() {
    document.querySelector("input#date").setAttribute("readonly", "readonly");
  }

  componentDidUpdate() {
    if (this.props.visible && !this._input.value && !this.state.focused) {
      this._input.focus();
    } else {
      this._input.blur();
    }
  }

  render() {
    const { onClose, onSubmit } = this.props;
    const { date, focused } = this.state;
    return (
      <Fragment>
        <Overlay visible={this.props.visible} onClick={onClose}>
          <InnerWrapper>
            <CloseButton onClick={onClose}><CloseButtonIcon/></CloseButton>
            <Form onClick={this.handleFormClick} onSubmit={onSubmit}>
              <Label>What's next?</Label>
              <InnerFormContainer>
                <Input
                  type="text"
                  id="whatTodo"
                  ref={ref => this._input = ref}
                  autoComplete="off"
                  placeholder="내일 오후 3시까지 우체국 가기"
                  autoFocus={true}/>
                <SingleDatePicker
                  date={date}
                  renderCalendarInfo={this.renderDatePresets}
                  displayFormat="YYYY-MM-DD"
                  onDateChange={this.handleDateChange}
                  focused={focused}
                  onFocusChange={this.handleFocusChange}
                  numberOfMonths={1}
                  monthFormat="YYYY. MM"
                  weekDayFormat="ddd"
                  calendarInfoPosition="top"
                  horizontalMonthPadding={10}
                  id="date"
                />
                <Button type="submit">ADD</Button>
              </InnerFormContainer>
            </Form>
          </InnerWrapper>
        </Overlay>
      </Fragment>
    );
  }
}

AddTodoOverlay.defaultProps = {
  autoFocus: false,
  initialDate: moment(),
};

export default AddTodoOverlay;
