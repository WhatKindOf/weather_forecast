import React from "react";
import styled from "styled-components";
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
    }
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
        this.getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error);
      }
    );
  };

  getWeather = (lat, lon) => {
    const api_url =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY;
    fetch(api_url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          weatherInfo: {
            cityName: json.name,
            weather: json.weather[0].main,
            temp: Math.ceil(json.main.temp - 273.15) + "℃",
            tempMin: Math.ceil(json.main.temp_min - 273.15) + "℃",
            tempMax: Math.ceil(json.main.temp_max - 273.15) + "℃",
            humidity: json.main.humidity + "%",
            windSpeed: json.wind.speed + "m/s"
          }
        });
      });
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
        <Lower>
          <CurrentLocation>
            <Location>{this.state.weatherInfo.cityName}</Location>
            <CurrentDate>
              {`${this.state.year} 
            ${this.state.month}
            ${this.state.day}
            ${this.state.dayOfWeek}`}
            </CurrentDate>
            <CurrentTime>
              {`${this.state.hour}
            ${this.state.minute}
            ${this.state.second}`}
            </CurrentTime>
          </CurrentLocation>
          <CurrentWeather>
            <WeatherImage>
              <Img src={require("./images/sunny.png")} alt="sun" />
              <WhatIsWeather>{this.state.weatherInfo.weather}</WhatIsWeather>
            </WeatherImage>
            <WeatherInfo>
              <TemperatureInfo>
                <CurrentTemperature>
                  {this.state.weatherInfo.temp}
                </CurrentTemperature>
                <TemperatureMinMax>
                  <MinTemperature>
                    {this.state.weatherInfo.tempMin}
                  </MinTemperature>
                  &nbsp;<Slash>/</Slash>&nbsp;
                  <MaxTemperature>
                    {this.state.weatherInfo.tempMax}
                  </MaxTemperature>
                </TemperatureMinMax>
              </TemperatureInfo>
              <HumidityWind>
                <HumWind>
                  습도 : {this.state.weatherInfo.humidity} / 풍속 :{" "}
                  {this.state.weatherInfo.windSpeed}
                </HumWind>
              </HumidityWind>
            </WeatherInfo>
          </CurrentWeather>
        </Lower>
      </div>
    );
  }
}

const Lower = styled.div`
  position: absolute;
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0px;
`;

const CurrentLocation = styled.div`
  height: 20%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CurrentDate = styled.p`
  font-size: 2.5vmin;
  color: white;
  margin: 0px;
`;

const CurrentTime = styled.p`
  font-size: 2.5vmin;
  color: white;
  margin-top: 0px;
`;

const Location = styled.p`
  font-size: 7vmin;
  font-weight: bold;
  color: white;
  margin: 25px 0px 7px 0px;
`;

const CurrentWeather = styled.div`
  height: 70%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherImage = styled.div`
  height: 70%;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhatIsWeather = styled.p`
  font-weight: bold;
  font-size: 4vmin;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const WeatherInfo = styled.div`
  height: 100%;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TemperatureInfo = styled.div`
  height: 60%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
`;

const CurrentTemperature = styled.p`
  font-size: 17vmin;
  color: white;
  font-weight: bold;
  margin: 10px 0px;
`;

const TemperatureMinMax = styled.div`
  margin: 0px;
`;

const MinTemperature = styled.span`
  color: blue;
  font-size: 4vmin;
  margin-right: 10px;
  font-weight: bold;
`;

const MaxTemperature = styled.span`
  color: red;
  font-size: 4vmin;
  margin-left: 10px;
  font-weight: bold;
`;

const Slash = styled.span`
  color: black;
  font-size: 4vmin;
`;

const HumidityWind = styled.div`
  height: 40%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HumWind = styled.p`
  color: white;
  font-size: 3vmin;
  font-weight: bold;
`;

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
