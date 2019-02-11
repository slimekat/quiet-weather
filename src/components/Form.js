import React from "react";

const Form = props => {
    return (
        <div>
            <form onSubmit={props.getWeather}>
                <input type="text" name="city" placeholder="City..." />
                <input type="text" name="country" placeholder="Country..." />
                <button>Get Weather</button>
            </form>
            {/* <button onClick={props.getLocation}>Get Location</button> */}
        </div>
    );
}

export default Form;