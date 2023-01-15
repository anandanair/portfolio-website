import { FormControl, FormLabel } from "@mui/material";
import React from "react";

export default function CustomForm(props) {
  return (
    <FormControl
      className="customizeForm"
      sx={{ display: "flex", justifyContent: "flex-start" }}
    >
      <FormLabel sx={{ textAlign: "left", mx: 1 }} component="legend">
        {props.label}
      </FormLabel>
      {props.children}
    </FormControl>
  );
}
