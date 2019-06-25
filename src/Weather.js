import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Weather extends React.Component {
  state = {
    year: "",
    month: "",
    day: "",
    dayOfWeek: "",
    hour: "",
    minute: "",
    second: ""
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

  componentDidMount() {
    this.getDate();
    setInterval(() => this.getTime(), 1000);
  }

  render() {
    const data = this.props.data;
    console.log(this.props);
    return (
      <Lower>
        <CurrentLocation>
          <Location>{data.weatherInfo.cityName}</Location>
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
            <Img
              src={require("./images/" + data.weatherInfo.weather + ".png")}
              alt={data.weatherInfo.weather}
            />
            <WhatIsWeather>{data.weatherInfo.weather}</WhatIsWeather>
          </WeatherImage>
          <WeatherInfo>
            <TemperatureInfo>
              <CurrentTemperature>{data.weatherInfo.temp}</CurrentTemperature>
              <TemperatureMinMax>
                <MinTemperature>{data.weatherInfo.tempMin}</MinTemperature>
                &nbsp;<Slash>/</Slash>&nbsp;
                <MaxTemperature>{data.weatherInfo.tempMax}</MaxTemperature>
              </TemperatureMinMax>
            </TemperatureInfo>
            <HumidityWind>
              <HumWind>
                습도 : {data.weatherInfo.humidity} / 풍속 :
                {data.weatherInfo.windSpeed}
              </HumWind>
            </HumidityWind>
          </WeatherInfo>
        </CurrentWeather>
      </Lower>
    );
  }
}

Weather.propTypes = {
  data: PropTypes.object.isRequired
};

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
  font-weight: bold;
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

export default Weather;
