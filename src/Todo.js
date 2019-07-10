import React from "react";
import styled, { css } from "styled-components";
import { TextField } from "@material-ui/core";

class Todo extends React.Component {
  render() {
    const { todoList, clickCheck, clickDelete, inputTodo } = this.props;
    return (
      <Lower>
        <InputSide>
          <TextField
            variant="outlined"
            helperText="할일을 작성해주세요."
            label="할일 추가"
            onKeyPress={e => {
              if (e.key === "Enter") {
                inputTodo(e.target.value);
                e.target.value="";
              }
            }}
          />
        </InputSide>
        <TodoSide>
          {todoList === null
            ? ""
            : todoList.map(t => {
                if (t.deleteClick !== "true") {
                  return (
                    <TodoDiv key={t.id} check={todoList[t.id].checkClick}>
                      <TodoText>{t.todo}</TodoText>
                      <div>
                        <CheckButton
                          onClick={() => clickCheck(t.id)}
                          check={todoList[t.id].checkClick}
                        >
                          <ButtonText>✔</ButtonText>
                        </CheckButton>
                        <DeleteButton onClick={() => clickDelete(t.id)}>
                          <ButtonText>X</ButtonText>
                        </DeleteButton>
                      </div>
                    </TodoDiv>
                  );
                }
                return "";
              })}
        </TodoSide>
      </Lower>
    );
  }
}

const Lower = styled.div`
  position: absolute;
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
`;

const CheckButton = styled.button`
  ${props => {
    if (props.check === "true") {
      return css`
        background-color: #808080;
      `;
    } else {
      return css`
        background-color: rgba(39, 198, 104);
      `;
    }
  }}
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: rgba(226, 60, 45);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  margin-left: 5px;
`;

const TodoDiv = styled.div`
  ${props => {
    if (props.check === "true") {
      return css`
        border: none;
      `;
    } else {
      return css`
        border: 4px solid rgba(249, 227, 138);
        box-shadow: 10px 10px 30px #000808;
      `;
    }
  }}

  width: 75%;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const TodoText = styled.span`
  font-weight: bold;
  margin-left: 10px;
`;

const ButtonText = styled.span`
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputSide = styled.div`
  height: 15%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoSide = styled.div`
  height: 83%;
  width: 90%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export default Todo;
