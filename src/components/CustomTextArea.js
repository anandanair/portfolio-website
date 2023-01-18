import React from "react";
import tinycolor from "tinycolor2";

export default function CustomTextArea(props) {
  return (
    <textarea
      className="designTextarea"
      value={props.value}
      style={{
        height: props.height,
        width: props.width,
        color: tinycolor(props.bgColor).isLight() ? "black" : "white",
        fontSize: props.fontSize,
      }}
      onChange={props.onChange}
    />
  );
}
