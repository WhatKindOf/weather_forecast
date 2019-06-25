import React from "react";
import styled, { keyframes, css } from "styled-components";
import Weather from "./Weather";
import Todo, { Bell } from "./Todo";
///////////////// AppBar를 위한 import문 ///////////////////
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
///////////////////////////////////////////////////////////
import { withStyles } from "@material-ui/core/styles";
///////////////////////////////////////////////////////////

const API_KEY = "6e1d62bbdf0fd3f8bcc16544e09f15f2";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  appBar: {
    backgroundColor: "transparent"
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class Appbar extends React.Component {
  state = {
    weatherInfo: {
      cityName: "",
      weather: "",
      temp: "",
      tempMin: "",
      tempMax: "",
      humidity: "",
      windSpeed: ""
    },
    show: false,
    showQuestion: "none"
  };

  getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude)
          .then(res =>
            this.setState({
              weatherInfo: {
                cityName: res.name,
                weather: res.weather[0].main,
                temp: Math.ceil(res.main.temp - 273.15) + "℃",
                tempMin: Math.ceil(res.main.temp_min - 273.15) + "℃",
                tempMax: Math.ceil(res.main.temp_max - 273.15) + "℃",
                humidity: res.main.humidity + "%",
                windSpeed: res.wind.speed + "m/s"
              },
              show: true
            })
          )
          .catch(err => console.log(err));
      },
      error => {
        console.log(error);
      }
    );
  };

  getWeather = async (lat, lon) => {
    const api_url =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY;

    const response = await fetch(api_url);
    const body = await response.json();
    return body;
  };

  getCityWeather = async e => {
    const targetCity = e.target.value;
    const api_url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      targetCity +
      "&appid=" +
      API_KEY;
    const response = await fetch(api_url);
    const body = await response.json();
    if (body.cod === 200) {
      this.setState({
        weatherInfo: {
          cityName: body.name,
          weather: body.weather[0].main,
          temp: Math.ceil(body.main.temp - 273.15) + "℃",
          tempMin: Math.ceil(body.main.temp_min - 273.15) + "℃",
          tempMax: Math.ceil(body.main.temp_max - 273.15) + "℃",
          humidity: body.main.humidity + "%",
          windSpeed: body.wind.speed + "m/s"
        },
        show: true
      });
    }
  };

  init = () => {
    this.setState({
      weatherInfo: {
        cityName: "",
        weather: "",
        temp: "",
        tempMin: "",
        tempMax: "",
        humidity: "",
        windSpeed: ""
      },
      show: false
    });
  };

  blockQuestion = () => {
    this.setState({
      showQuestion: "block"
    });
  };

  noneQuestion = () => {
    this.setState({
      showQuestion: "none"
    });
  };

  render() {
    const { classes } = this.props;
    const { count, todoList, clickCheck, clickDelete, inputTodo } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar className={classes.toolBar}>
            <HomeButton onClick={this.init}>
              <img src={require("./images/Home.png")} alt="HomeButton" />
            </HomeButton>
            <div>
              <img
                src={require("./images/question.png")}
                alt="question_mark"
                onMouseEnter={this.blockQuestion}
                onMouseOut={this.noneQuestion}
              />
              <UpArrow display={this.state.showQuestion} />
              <Question display={this.state.showQuestion}>
                <QuestionSentence>
                  특정 도시를 검색할 수 있습니다. <br />
                  단, 영문자로 검색하셔야 합니다.
                  <br />
                  (예시 : 대구 -> daegu)
                </QuestionSentence>
              </Question>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="도시 검색"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "Search" }}
                onChange={this.getCityWeather}
              />
            </div>
            <HereButton onClick={this.getCurrentLocationWeather}>
              <ButtonImage src={require("./images/map.png")} />
            </HereButton>
            <Notice>
              <img
                src={require("./images/pointing-left.png")}
                alt="pointing-left"
              />
              <NoticeSentence>현재 위치 날씨</NoticeSentence>
            </Notice>
            <Bell count={count} />
          </Toolbar>
        </AppBar>
        {this.state.show === true ? (
          <Weather data={this.state} />
        ) : (
          <Todo
            todoList={todoList}
            clickCheck={clickCheck}
            clickDelete={clickDelete}
            inputTodo={inputTodo}
          />
        )}
      </div>
    );
  }
}

const HomeButton = styled.button`
  background-color: transparent;
  margin-right: 15px;
  border: none;
  cursor: pointer;
`;

const HereButton = styled.button`
  background-color: transparent;
  margin-left: 20px;
  margin-right: 25px;
  border: none;
  cursor: pointer;
`;

const ButtonImage = styled.img`
  width: 32px;
  height: 32px;
`;

const move = keyframes`
  0%{
    transform:translateX(0px);
  }
  50%{
    transform:translateX(-6px);
  }
  100%{
    transform:translateX(0px);
  }
`;

const Notice = styled.div`
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${move} 1s linear infinite;
`;

const NoticeSentence = styled.p`
  font-weight: bold;
  color: white;
  margin-left: 8px;
  font-size: 2vmin;
  cursor: default;
`;

const UpArrow = styled.div`
  margin-left: 9px;
  margin-top: 4px;
  position: absolute;
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 9px solid white;
  ${props => {
    return css`
      display: ${props.display};
    `;
  }}
`;

const Question = styled.div`
  border: 3px solid #fff;
  position: absolute;
  margin-top: 13px;
  margin-left: -30px;
  border-radius: 9px;
  z-index: 2;
  padding: 9px;
  ${props => {
    return css`
      display: ${props.display};
    `;
  }}
`;

const QuestionSentence = styled.span`
  font-weight: bold;
  color: white;
`;

export default withStyles(styles)(Appbar);
