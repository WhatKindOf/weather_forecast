import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./reducer";
import Appbar from "./Appbar";

function mapStateToProps(state) {
  const { todoList, count } = state;
  return {
    todoList,
    count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clickCheck: bindActionCreators(actionCreators.clickCheck, dispatch),
    clickDelete: bindActionCreators(actionCreators.clickDelete, dispatch),
    inputTodo: bindActionCreators(actionCreators.inputTodo, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appbar);
