import React from "react";
import styled, { css } from "styled-components";
import { TextField } from "@material-ui/core";
import update from "react-addons-update";

class Todo extends React.Component {
  state = {
    TodoList: [],
    id: 0
  };

  addTodo = e => {
    if (e.key === "Enter") {
      const text = e.target.value;
      this.setState({
        TodoList: [
          ...this.state.TodoList,
          {
            id: this.state.id,
            todo: text,
            checkClick: "false",
            deleteClick: "false"
          }
        ],
        id: this.state.id + 1
      });
    }
  };

  clickCheckButton = id => {
    if (this.state.TodoList[id].checkClick === "false") {
      this.setState({
        TodoList: update(this.state.TodoList, {
          [id]: {
            checkClick: { $set: "true" }
          }
        })
      });
    } else {
      this.setState({
        TodoList: update(this.state.TodoList, {
          [id]: {
            checkClick: { $set: "false" }
          }
        })
      });
    }
  };

  clickDeleteButton = id => {
    this.setState({
      TodoList: update(this.state.TodoList, {
        [id]: {
          deleteClick: { $set: "true" }
        }
      })
    });
  };

  render() {
    return (
      <Lower>
        <InputSide>
          <TextField
            variant="outlined"
            helperText="할일을 작성해주세요."
            label="할일 추가"
            onKeyPress={this.addTodo}
          />
        </InputSide>
        <TodoSide>
          {this.state.TodoList === null
            ? ""
            : this.state.TodoList.map(t => {
                if (t.deleteClick !== "true") {
                  return (
                    <TodoDiv
                      key={t.id}
                      check={this.state.TodoList[t.id].checkClick}
                    >
                      <TodoText>{t.todo}</TodoText>
                      <div>
                        <CheckButton
                          check={this.state.TodoList[t.id].checkClick}
                          onClick={() => this.clickCheckButton(t.id)}
                        >
                          <ButtonText>✔</ButtonText>
                        </CheckButton>
                        <DeleteButton
                          onClick={() => this.clickDeleteButton(t.id)}
                        >
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

function Bell() {
  return (
    <BellDiv>
      <Count>
        <BellText>4</BellText>
      </Count>
      <img src={require("./images/bell.png")} alt="bell" />
    </BellDiv>
  );
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

const BellDiv = styled.div`
  position: absolute;
  right: 20px;
`;

const Count = styled.div`
  position: absolute;
  margin-left: 11px;
  margin-top: -11px;
  background-color: purple;
  border-radius: 50%;
  padding: 1px 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 30px #000808;
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

const BellText = styled.span`
  font-size: 15px;
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

export { Bell };

export default Todo;
