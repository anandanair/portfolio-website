import { Button, FormControl, FormLabel } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function CustomColorPicker(props) {
  return (
    <FormControl sx={{ display: "flex", justifyContent: "flex-start" }}>
      <FormLabel sx={{ textAlign: "left" }} component="legend">
        Color Picker
      </FormLabel>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Color 1</Button>
        {props.properties.backgroundColorType !== "static" && (
          <Button variant="contained">Color 2</Button>
        )}
      </Stack>
    </FormControl>
  );
}
