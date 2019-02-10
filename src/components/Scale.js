import React, { Component } from "react";

class Scale extends Component {
    state = {
        selection: "C"
    };

    handleChange = change => {
        this.setState({
            selection: change.target.value
        });
    };
    render(){
        return(
            <div>
            <form >
                <input checked={this.state.selection === "C"} onChange={this.handleChange} type="radio" value="C" name="scaleToggle" id="Togglescale-C" />
                <input checked={this.state.selection === "F"} onChange={this.handleChange} type="radio" value="F" name="scaleToggle" id="Togglescale-F" />
                {/* <label for="scale">{props.scale == "celsius" ? "C" : "F"}</label> */}
            </form>
            </div >
        );
    }
}


export default Scale;