import { Check } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import tinycolor from "tinycolor2";

export default function CustomTextArea(props) {
  const [value, setValue] = useState(props.value);

  const handleChane = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <textarea
        className="designTextarea"
        value={value}
        style={{
          height: props.height,
          width: props.width,
          color: tinycolor(props.bgColor).isLight() ? "black" : "white",
          fontSize: props.fontSize,
        }}
        onChange={handleChane}
      />
      <IconButton
        sx={{ position: "absolute", bottom: 5, right: 5 }}
        onClick={() => props.onDone(value)}
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
