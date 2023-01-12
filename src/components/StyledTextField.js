import { TextField } from "@mui/material";
import React from "react";
import { useLocalTheme } from "../contexts/ThemeContext";

export default function StyledTextField(props) {
  const { localTheme } = useLocalTheme();
  const color = localTheme === "dark" ? "#F7FBFC" : "#0A2647";

  const handleChange = (event) => {
    props.onChange(event.target.value, props.id);
  };

  return (
    <TextField
      id={props.id}
      required={props.required}
      label={props.label}
      type={props.type}
      variant={props.variant}
      error={props.error !== ""}
      fullWidth
      sx={{
        input: { color: color, fontFamily: "Antic Slab" },
        textarea: { color: color, fontFamily: "Antic Slab" },
        mb: 3,
      }}
      value={props.value}
      onChange={handleChange}
      multiline={props.multiline}
      rows={5}
    />
  );
}
