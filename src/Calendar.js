import React from "react";
import styled, { css } from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  between: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

class Calendar extends React.Component {
  state = {
    currentYear: "",
    currentMonth: "",
    week: [],
    open: false,
    schedule: "",
    startDate: "",
    endDate: ""
  };

  getDate = () => {
    const date = new Date();
    this.setState({
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth() + 1
    });
  };

  componentDidMount() {
    this.getDate();
    this.showWeek();
  }

  showDialog = tmp => {
    this.setState({
      startDate: tmp,
      open: true
    });
  };

  closeDialog = () => {
    this.setState({
      schedule: "",
      startDate: "",
      endDate: "",
      open: false
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (
      this.state.schedule !== "" &&
      this.state.startDate !== "" &&
      this.state.endDate !== ""
    ) {
      const scheduleObj = {
        schedule: this.state.schedule,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      };
      localStorage.setItem("Schedule_LS", JSON.stringify(scheduleObj));

      this.setState({
        schedule: "",
        startDate: "",
        endDate: "",
        open: false
      });
    }
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  showWeek = () => {
    const date = new Date();
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const first = firstDate.getDay();
    const last = lastDate.getDate();
    const rows = Math.ceil((first + last) / 7);

    let cnt = 0;
    let week = [];

    for (let i = 0; i < rows; i++) {
      let day = [];

      for (let j = 0; j < 7; j++) {
        let tmp = cnt - first + 1;
        day.push(
          <DayDiv>
            <TmpSpan day={j}>{tmp > 0 && tmp <= last ? tmp : ""}</TmpSpan>
            <AddButton onClick={() => this.showDialog(tmp)}>
              {tmp > 0 && tmp <= last ? (
                <img src={require("./images/add.png")} alt="add" />
              ) : (
                ""
              )}
            </AddButton>
          </DayDiv>
        );
        cnt = cnt + 1;
      }
      week.push(<WeekDiv rows={rows}>{day}</WeekDiv>);
    }
    this.setState({
      week
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Div>
        <Container>
          <TitleDiv>
            <DateSpan>
              {this.state.currentYear ? this.state.currentYear : ""}년{" "}
              {this.state.currentMonth ? this.state.currentMonth : ""}월
            </DateSpan>
          </TitleDiv>
          <DayOfWeekDiv>
            <DayOfWeek>
              <DaySpan red>일</DaySpan>
            </DayOfWeek>
            <DayOfWeek>
              <DaySpan>월</DaySpan>
            </DayOfWeek>
            <DayOfWeek>
              <DaySpan>화</DaySpan>
            </DayOfWeek>
            <DayOfWeek>
              <DaySpan>수</DaySpan>
            </DayOfWeek>
            <DayOfWeek>
              <DaySpan>목</DaySpan>
            </DayOfWeek>
            <DayOfWeek>
              <DaySpan>금</DaySpan>
            </DayOfWeek>
            <DayOfWeek>
              <DaySpan mint>토</DaySpan>
            </DayOfWeek>
          </DayOfWeekDiv>
          <CalendarDiv>{this.state.week ? this.state.week : ""}</CalendarDiv>
        </Container>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle className={classes.center}>일정 추가</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              label="일정"
              type="text"
              name="schedule"
              required="true"
              value={this.state.schedule}
              onChange={this.handleValueChange}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="시작일"
              type="text"
              placeholder="DD"
              name="startDate"
              required="true"
              value={this.state.startDate}
              onChange={this.handleValueChange}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="종료일"
              type="text"
              placeholder="DD"
              name="endDate"
              required="true"
              value={this.state.endDate}
              onChange={this.handleValueChange}
            />
          </DialogContent>
          <DialogActions className={classes.between}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              일정 저장
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.closeDialog}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Div>
    );
  }
}

const DaySpan = styled.span`
  font-weight: bold;
  ${props => {
    if (props.red) {
      return css`
        color: red;
      `;
    } else if (props.mint) {
      return css`
        color: #00ffff;
      `;
    } else {
      return css`
        color: white;
      `;
    }
  }}
`;

const TmpSpan = styled.span`
  margin-right: 7px;
  margin-top: 3px;
  font-weight: bold;
  ${props => {
    if (props.day === 0) {
      return css`
        color: red;
      `;
    } else if (props.day === 6) {
      return css`
        color: #00ffff;
      `;
    } else {
      return css`
        color: white;
      `;
    }
  }}
`;

const CalendarDiv = styled.div`
  height: 91%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
`;

const DayOfWeekDiv = styled.div`
  width: 100%;
  height: 4%;
  display: flex;
  border: 1px solid #e2e2e2;
`;

const DayOfWeek = styled.div`
  width: calc(100% / 7);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e2e2e2;
`;

const DateSpan = styled.span`
  font-size: 3vmin;
  font-weight: bold;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const TodayButton = styled.button`
  border-radius: 5px;
  background-color: white;
  height: 100%;
  padding: auto 8px;
  cursor: pointer;
`;

const TitleDiv = styled.div`
  height: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const WeekDiv = styled.div`
  width: 100%;
  display: flex;
  ${props => {
    return css`
      height: calc(100% / ${props.rows});
    `;
  }}
`;

const DayDiv = styled.div`
  height: 100%;
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid #e2e2e2;
`;

const AddButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Container = styled.div`
  height: 94%;
  width: 94%;
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  position: absolute;
  height: 92%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withStyles(styles)(Calendar);
