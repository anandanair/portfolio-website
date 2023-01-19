import { Check } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useLocalTheme } from "../contexts/ThemeContext";

export default function CustomTextArea(props) {
  const [value, setValue] = useState(props.value);
  const { getDynamicColor } = useLocalTheme();

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
          color: getDynamicColor(props.bgColor),
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
            color: getDynamicColor(props.bgColor),
          }}
        />
      </IconButton>
    </div>
  );
}
