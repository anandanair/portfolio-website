import { Slider, Stack } from "@mui/material";
import React from "react";

export default function CustomSlider(props) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ width: "100%", mt: 2 }}
    >
      {<props.icon />}
      <Slider
        value={props.value}
        max={props.max}
        min={0}
        onChange={props.onChange}
      />
    </Stack>
  );
}
