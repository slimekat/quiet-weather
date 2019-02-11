import React from "react";

const Scale = props => {
    let { selection, onChange } = props;
    return (
        <div>
            <form>
                <div className="scale-field">
                    <input checked={selection === "C"} onChange={onChange} type="radio" value="C" name="scaleToggle" id="Togglescale-C" />
                    <label for="Togglescale-C">C</label>
                    <input checked={selection === "F"} onChange={onChange} type="radio" value="F" name="scaleToggle" id="Togglescale-F" />
                    <label for="Togglescale-F">F</label>
                </div>
            </form>
        </div>
    );
}


export default Scale;