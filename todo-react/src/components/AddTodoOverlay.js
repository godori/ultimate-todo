import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: ${props => props.visible ? 'block' : 'none'};
`;

const Form = styled.form`
  display: block;
  width: 87%;
  border-bottom: solid 2px #00ffe2;
  padding-bottom: 14.5px;
  
  font-family: SFCompactText, sans-serif;
  
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 28px;
  color: #00FFE2;
  font-size: 14px;
  font-weight: 300;
`;

const Input = styled.input`
  float: left;
  font-size: 18px;
  font-weight: 500;
  color: #FFF;
  width: 72%;
  height: 22px;
  border: none;
  background: transparent;
  margin-right: 20px;
  
  &::placeholder {
    color: #696969;
  }
  
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  float: right;
  font-size: 18px;
  font-weight: 600;
  color: #00FFE2;
  border: none;
  background: none;
  
  &:focus {
    outline: none;
  }
`;


class AddTodoOverlay extends Component {

  _input = null;
  handleFormClick = e => {
    e.stopPropagation();
  };

  componentWillMount() {
    document.addEventListener('keydown', e => {
      e.keyCode === 27 && this.props.onClose();
    });
  }

  componentDidUpdate() {
    this.props.visible && this._input.focus();
  }

  render() {
    const { onClose, onSubmit } = this.props;
    return (
      <Fragment>
        <Overlay visible={this.props.visible} onClick={onClose}>
          <Form onClick={this.handleFormClick} onSubmit={onSubmit}>
            <Label>What's next?</Label>
            <Input
              type="text"
              name="whatTodo"
              ref={ref => this._input = ref}
              placeholder="내일 오후 3시까지 우체국 가기"
              autoFocus={true}/>
            <Button type="submit">ADD</Button>
          </Form>
        </Overlay>
      </Fragment>
    );
  }
}

export default AddTodoOverlay;