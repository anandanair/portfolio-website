import { Check } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import tinycolor from "tinycolor2";

export default function CustomTextArea(props) {
  return (
    <div style={{ position: "relative" }}>
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
      <IconButton
        sx={{ position: "absolute", bottom: 5, right: 5 }}
        onClick={props.onDone}
      >
        <Check
          style={{
            color: tinycolor(props.bgColor).isLight() ? "black" : "white",
          }}
        />
      </IconButton>
    </div>
  );
}
