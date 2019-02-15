import React from "react";
import Titles from "./components/Titles"
import Weather from "./components/Weather"
import Scale from "./components/Scale"
import AutoCompleteText from "./components/AutoCompleteText"
import cities from "./components/cities"

const API_KEY = "b7ef65cab5a1a9406d5088b8b1a40e00";

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    scale: "C",
    owmcode: "721",
    inputSelected: false,

    coords: {
      latitude: undefined,
      longitude: undefined,
      altitude: undefined,
      accuracy: undefined,
      altitudeAccuracy: undefined,
      heading: undefined,
      speed: undefined
    },

    isGeolocationAvailable: undefined,
    isGeolocationEnabled: undefined,
    positionError: undefined,
  }

  tempConvert(inputTemp) {
    if (this.state.scale === "C") {
      return inputTemp;
    } else {
      inputTemp = (inputTemp + 32);
      return inputTemp;
    }
  }

  changeScale = change => {
    this.setState({
      scale: change.target.value
    });
  };

  checkInputSelected(inputState) {
    this.setState({
      inputSelected: inputState
    });
    console.log(inputState);
  };

  getLocation = async () => {
    let pos, lat, lon;
    try {
      pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      });
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    } catch (e) {
      try {
        const ip = await fetch("https://jsonip.com");
        const ipData = await ip.json();
        pos = await fetch(`https://api.ipstack.com/${ipData.ip}?access_key=2a5f7d59605166594eb855d656142724`);
        const locationData = await pos.json();
        lat = locationData.latitude;
        lon = locationData.longitude;
        console.log("backup success");
      } catch (e) {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          owmcode: "721",
          error: "Unable to find location"
        })
        return;
      }
    }
    const weather_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`);
    const data = await weather_call.json();
    this.updateState(data);
  }

  getWeather = async (city) => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
    const data = await api_call.json();
    this.updateState(data);
  }

  updateState(data) {
    if (data.message) {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: data.message
      });
    } else {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        owmcode: data.weather[0].id,
        error: ""
      });
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="col">
                <div className="row-xs-2 title-container">
                  <div className="weather-container">
                    <Titles />
                    <Weather
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}
                      tempConvert={this.tempConvert.bind(this)}
                      scale={this.state.scale}
                      owmcode={this.state.owmcode}
                      inputSelected={this.state.inputSelected}
                    />
                  </div>
                  <Scale
                    selection={this.state.scale}
                    onChange={this.changeScale}
                  />

                </div>
                <div className="row-xs-4 form-container">
                  <div className="input-container">
                    <AutoCompleteText className="input-field"
                      items={cities}
                      getWeather={this.getWeather}
                      checkInputSelected={this.checkInputSelected.bind(this)}
                    />
                  </div>
                  <button className="location-btn" aria-label="Location Button" onClick={this.getLocation.bind(this)}><i className="fas fa-location-arrow"></i></button>
                </div>
                <div className="row-xs-2 credits-container">
                  <p className="credits">
                    <span>Developed by Arielle Grimes. </span>
                    <span>Made with <i className="fab fa-react" aria-label="React Logo" /></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};



export default App;