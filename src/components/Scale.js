import React from "react";

const Scale = props => {
    let { selection, onChange } = props;
    return (
        <div>
            <form >
                <input checked={selection === "C"} onChange={onChange} type="radio" value="C" name="scaleToggle" id="Togglescale-C" />
                <input checked={selection === "F"} onChange={onChange} type="radio" value="F" name="scaleToggle" id="Togglescale-F" />
            </form>
        </div>
    );
}


export default Scale;