import React from "react";



const Weather = props => (
    <div className="weather__info">
        <i className="wi wi-owm-721 title-container__weather-icon"></i>
        <div className="weather__output">
            {
                props.city && props.country && <p className="weather__key">Location:
                    <span className="weather__value"> {props.city},{props.country}</span>
                </p>
            }
            {
                props.temperature && <p className="weather__key">Temperature:
                    <span className="weather__value"> {props.tempConvert(props.temperature - 273.15).toFixed(1)} {props.scale == "celsius" ? "C":"F"}</span>
                    {/* <span className="weather__value"> {(props.temperature - 273.15).toFixed(1)} C</span> */}

                </p>
            }
            {
                props.humidity && <p className="weather__key">Humidity:
                    <span className="weather__value"> {props.humidity}</span>
                </p>
            }
            {
                props.description && <p className="weather__key">Condition:
                    <span className="weather__value"> {props.description}</span>
                </p>
            }
            {
                props.error && <p className="weather__error">{props.error}</p>
            }
        </div>
    </div>
);

export default Weather