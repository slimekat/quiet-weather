import React from "react";

const Scale = props => {
    let { selection, onChange } = props;
    return (
        
                <div className="scale-field">
                    <input checked={selection === "C"} onChange={onChange} type="radio" value="C" name="scaleToggle" id="Togglescale-C" />
                    <label htmlFor="Togglescale-C">C</label>
                    <input checked={selection === "F"} onChange={onChange} type="radio" value="F" name="scaleToggle" id="Togglescale-F" />
                    <label htmlFor="Togglescale-F">F</label>
                </div>
    );
}


export default Scale;