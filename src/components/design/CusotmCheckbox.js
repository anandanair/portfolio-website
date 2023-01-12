import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export default function CusotmCheckbox(props) {
  return (
    <FormControlLabel
      control={<Checkbox checked={props.checked} onChange={props.onChange} />}
      label={props.label}
    />
  );
}
