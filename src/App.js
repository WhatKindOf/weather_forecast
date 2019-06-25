import React from "react";
import Connect from "./Connect";
/////////////////////Redux를 위한 것들//////////////////////
import reducer from "./reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

let store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Connect />
      </Provider>
    );
  }
}
