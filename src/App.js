import React from "react";
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Scale from "./components/Scale"

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

  getLocation = async () => {
    let pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&APPID=${API_KEY}`);
    const data = await api_call.json();
    this.updateState(data);
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
    const data = await api_call.json();
    this.updateState(data);
  }

  updateState(data) {
    console.log(data);
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
                  />
                </div>
                <div className="row-xs-4 form-container">
                  <Form getWeather={this.getWeather} />
                  <button onClick={this.getLocation.bind(this)}>X</button>
                  <Scale
                    selection={this.state.scale}
                    onChange={this.changeScale}
                  />
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