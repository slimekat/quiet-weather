import React from "react";
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import Location from "./components/Location"

const API_KEY = "b7ef65cab5a1a9406d5088b8b1a40e00";

class App extends React.Component {
  
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,

    coords: {
      latitude:undefined,
      longitude:undefined,
      altitude:undefined,
      accuracy:undefined,
      altitudeAccuracy:undefined,
      heading:undefined,
      speed: undefined
    },

    isGeolocationAvailable:undefined,
    isGeolocationEnabled:undefined,
    positionError:undefined,
  }

  innerRef;
  setInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
    // this.Location.getLocation();
    // Location
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:""
      });
      // console.log(data);
    } else {
      this.setState({
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:"Please enter the values"
      });
    }
  }
  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="col">
                <div className="row-xs-2 title-container">
                  <Titles />
                  {/* <div className="row-xs-3 weather-container"> */}
                  <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}
                    />
                  {/* </div> */}
                  
                </div>
                <div className="row-xs-4 form-container">
                  <Form getWeather={this.getWeather}/>
                  {/* <Location getLocation={this.getLocation} /> */}
                  <Location ref={this.setInnerRef.bind(this)}/>
                  <button onClick={this.getLocation.bind(this)}>FUCK</button>
                  {/* <Location getLocation={this.getLocation}/> */}
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