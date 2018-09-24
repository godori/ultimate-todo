import React, { Component, Fragment } from 'react';
import moment from "moment";
import styled, { css } from "styled-components";

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


class DatePresets extends Component {
  state = {
    date: this.props.initialDate,

  };

  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    return (
      <Fragment>
        <PresetButtonContainer>
          {
            this.state.presets.map(preset => (
              <PresetButton
                key={preset.text}
                isSelected={this.isSameDate(preset.date)}
                onClick={this.handleDateChange.bind(null, preset.date)}>
                {preset.text}
              </PresetButton>
            ))
          }
        </PresetButtonContainer>
      </Fragment>
    );
  };
}

DatePresets

export default DatePresets;
