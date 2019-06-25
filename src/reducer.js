// Import
import update from "react-addons-update";
// Actions

const CLICK_CHECK = "CLICK_CHECK";
const CLICK_DELETE = "CLICK_DELETE";
const INPUT_TODO = "INPUT_TODO";

// Action Creators

function clickCheck(id) {
  return {
    type: CLICK_CHECK,
    id: id
  };
}

function clickDelete(id) {
  return {
    type: CLICK_DELETE,
    id: id
  };
}

function inputTodo(text) {
  return {
    type: INPUT_TODO,
    text: text
  };
}

// Reducer

const initialState = {
  todoList: [],
  id: 0,
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CLICK_CHECK:
      return applyClickCheck(state, action.id);
    case CLICK_DELETE:
      return applyClickDelete(state, action.id);
    case INPUT_TODO:
      return applyInputTodo(state, action.text);
    default:
      return state;
  }
}

// Reducer Functions

function applyClickCheck(state, id) {
  if (state.todoList[id].checkClick === "false") {
    return {
      ...state,
      todoList: update(state.todoList, {
        [id]: {
          checkClick: { $set: "true" }
        }
      }),
      count: state.count - 1
    };
  } else {
    return {
      ...state,
      todoList: update(state.todoList, {
        [id]: {
          checkClick: { $set: "false" }
        }
      }),
      count: state.count + 1
    };
  }
}

function applyClickDelete(state, id) {
  let minus = 0;
  if (state.todoList[id].checkClick === "false") {
    minus = 1;
  }
  return {
    ...state,
    todoList: update(state.todoList, {
      [id]: {
        deleteClick: { $set: "true" }
      }
    }),
    count: state.count - minus
  };
}

function applyInputTodo(state, text) {
  return {
    todoList: [
      ...state.todoList,
      {
        id: state.id,
        todo: text,
        checkClick: "false",
        deleteClick: "false"
      }
    ],
    id: state.id + 1,
    count: state.count + 1
  };
}

// export Action Creators

const actionCreators = {
  clickCheck,
  clickDelete,
  inputTodo
};

export { actionCreators };

// export Reducer

export default reducer;
