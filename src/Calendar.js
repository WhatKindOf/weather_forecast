import React from "react";
import styled, { css } from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";

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
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15
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
    importance: "default",
    storage: [],
    showScheduleList: false
  };

  getDate = () => {
    const date = new Date();
    this.setState({
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth() + 1
    });
  };

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
      open: false
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.schedule !== "") {
      const scheduleObj = {
        schedule: this.state.schedule,
        startDate: this.state.startDate,
        importance: this.state.importance
      };
      const storage = this.state.storage;
      storage.push(scheduleObj);
      localStorage.setItem("Schedule_LS", JSON.stringify(storage));

      this.setState({
        schedule: "",
        startDate: "",
        open: false,
        storage: storage,
        importance: "default"
      });

      this.showWeek();
    }
  };

  deleteSchedule = async (startDate, schedule) => {
    const storage = this.state.storage;
    const newStorage = storage.filter(s => {
      return s.schedule !== schedule || s.startDate !== startDate;
    });
    await this.setState({
      storage: newStorage
    });
    localStorage.setItem("Schedule_LS", JSON.stringify(this.state.storage));

    console.log(this.state.storage);
    this.closeList();
    this.showWeek();
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  chooseColor = color => {
    if (this.state.importance === color) {
      this.setState({
        importance: "default"
      });
    } else {
      this.setState({
        importance: color
      });
    }
  };

  loadStorage = () => {
    const load = localStorage.getItem("Schedule_LS");
    if (load !== null) {
      const parsedLoad = JSON.parse(load);
      this.setState({
        storage: parsedLoad
      });
    }
  };

  showList = tmp => {
    this.setState({
      startDate: tmp,
      showScheduleList: true
    });
  };

  closeList = () => {
    this.setState({
      showScheduleList: false
    });
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

    const storage = this.state.storage;

    storage.sort(function(a, b) {
      return a["startDate"] - b["startDate"];
    });

    for (let i = 0; i < rows; i++) {
      let day = [];

      for (let j = 0; j < 7; j++) {
        let tmp = cnt - first + 1;
        const draw = storage.filter(s => {
          return tmp === s.startDate;
        });

        day.push(
          <DayDiv key={tmp}>
            <TmpSpan day={j}>{tmp > 0 && tmp <= last ? tmp : ""}</TmpSpan>
            <ScheduleContainer>
              {draw !== null
                ? draw.map(d => {
                    return (
                      <ScheduleDiv key={tmp + 500} color={d.importance}>
                        <LinesEllipsis
                          text={d.schedule}
                          maxLine="1"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                        />
                      </ScheduleDiv>
                    );
                  })
                : ""}
            </ScheduleContainer>
            <Between>
              <ImgButton onClick={() => this.showList(tmp)}>
                {tmp > 0 && tmp <= last ? (
                  <img src={require("./images/list.png")} alt="list" />
                ) : (
                  ""
                )}
              </ImgButton>
              <ImgButton onClick={() => this.showDialog(tmp)}>
                {tmp > 0 && tmp <= last ? (
                  <img src={require("./images/add.png")} alt="add" />
                ) : (
                  ""
                )}
              </ImgButton>
            </Between>
          </DayDiv>
        );
        cnt = cnt + 1;
      }
      week.push(
        <WeekDiv key={cnt} rows={rows}>
          {day}
        </WeekDiv>
      );
    }

    this.setState({
      week
    });
  };

  componentWillMount() {
    this.loadStorage();
  }

  componentDidMount() {
    this.getDate();
    this.showWeek();
  }

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
        <Dialog open={this.state.open}>
          <DialogTitle className={classes.center}>일정 추가</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              label="일정"
              type="text"
              name="schedule"
              value={this.state.schedule}
              onChange={this.handleValueChange}
            />
            <br />
            <br />
            <div className={classes.column}>
              <span>중요도</span>
              <div className={classes.buttons}>
                <ImportanceButton
                  color="lightgreen"
                  onClick={() => this.chooseColor("lightgreen")}
                >
                  <MarkImg
                    color="lightgreen"
                    importance={this.state.importance}
                    src={require("./images/mark.png")}
                  />
                </ImportanceButton>
                <ImportanceButton
                  color="orange"
                  onClick={() => this.chooseColor("orange")}
                >
                  <MarkImg
                    color="orange"
                    importance={this.state.importance}
                    src={require("./images/mark.png")}
                  />
                </ImportanceButton>
                <ImportanceButton
                  color="red"
                  onClick={() => this.chooseColor("red")}
                >
                  <MarkImg
                    color="red"
                    importance={this.state.importance}
                    src={require("./images/mark.png")}
                  />
                </ImportanceButton>
              </div>
            </div>
          </DialogContent>
          <DialogActions className={classes.between}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.closeDialog}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.showScheduleList} onClose={this.closeList}>
          <DialogTitle className={classes.center}>일정 리스트</DialogTitle>
          <DialogContent className={classes.column}>
            {this.state.storage.map(s => {
              if (s.startDate === this.state.startDate) {
                return (
                  <div className={classes.buttons}>
                    <EachSchedule color={s.importance}>
                      {s.schedule}
                    </EachSchedule>
                    <ImgButton
                      onClick={() =>
                        this.deleteSchedule(s.startDate, s.schedule)
                      }
                    >
                      <img src={require("./images/delete.png")} alt="delete" />
                    </ImgButton>
                  </div>
                );
              }
            })}
          </DialogContent>
        </Dialog>
      </Div>
    );
  }
}

const EachSchedule = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-right: 15px;
  ${props => {
    return css`
      background-color: ${props.color};
      box-shadow: 2px 2px 2px 2px #808080;
    `;
  }}
`;

const Between = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ScheduleContainer = styled.div`
  width: 100%;
  height: 75%;
  overflow: hidden;
`;

const ScheduleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 26%;
  border-radius: 5px;
  margin-bottom: 6px;
  ${props => {
    if (props.color === "default") {
      return css`
        background-color: white;
      `;
    } else {
      return css`
        background-color: ${props.color};
      `;
    }
  }}
`;

const MarkImg = styled.img`
  display: none;
  ${props => {
    if (props.importance === props.color) {
      return css`
        display: block;
      `;
    }
  }}
`;

const ImportanceButton = styled.button`
  border-radius: 10px;
  height: 58px;
  width: 58px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => {
    return css`
      background-color: ${props.color};
    `;
  }}
`;

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
