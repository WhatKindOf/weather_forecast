import React from "react";
import styled from "styled-components";
import Weather from "./Weather";
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

class App extends React.Component {
  state = {
    year: "",
    month: "",
    day: "",
    dayOfWeek: "",
    hour: "",
    minute: "",
    second: "",
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
  };

  getDate = () => {
    const week = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일"
    ];
    const date = new Date();

    this.setState({
      year: date.getFullYear() + "년",
      month: date.getMonth() + 1 + "월",
      day: date.getDate() + "일",
      dayOfWeek: week[date.getDay()]
    });
    this.getTime();
  };

  getTime = () => {
    const date = new Date();

    this.setState({
      hour:
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + "시",
      minute:
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        "분",
      second:
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) +
        "초"
    });
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

  componentDidMount() {
    this.getDate();
    setInterval(() => this.getTime(), 1000);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar className={classes.toolBar}>
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
              />
            </div>
            <HereButton onClick={this.getCurrentLocationWeather}>
              <ButtonImage src={require("./images/map.png")} />
            </HereButton>
          </Toolbar>
        </AppBar>
        {this.state.show === true ? <Weather data={this.state} /> : ""}
      </div>
    );
  }
}

const HereButton = styled.button`
  background-color: transparent;
  margin-left: 20px;
  border: none;
`;

const ButtonImage = styled.img`
  width: 32px;
  height: 32px;
`;

export default withStyles(styles)(App);
