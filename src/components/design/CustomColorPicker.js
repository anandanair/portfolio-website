import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { MuiColorInput } from "mui-color-input";
import React from "react";

export default function CustomColorPicker(props) {
  const handleChange = (value, name) => {
    props.onChange(value, name);
  };

  return (
    <FormControl sx={{ display: "flex", justifyContent: "flex-start" }}>
      <FormLabel sx={{ textAlign: "left" }} component="legend">
        Color Picker
      </FormLabel>
      <Stack direction="row" spacing={2}>
        <MuiColorInput
          fullWidth
          value={props.properties.backgroundColor1}
          onChange={(color) => props.onChange(color, "backgroundColor1")}
        />
        {props.properties.backgroundColorType !== "static" && (
          <MuiColorInput
            fullWidth
            value={props.properties.backgroundColor2}
            onChange={(color) => props.onChange(color, "backgroundColor2")}
          />
        )}
      </Stack>

      {props.properties.backgroundColorType === "linear-gradient" && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Angle"
            id="colorAngle"
            fullWidth
            type="number"
            value={props.properties.colorAngle}
            onChange={(e) => handleChange(e.target.value, "colorAngle")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">deg</InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
      {props.properties.backgroundColorType === "radial-gradient" && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="X-Axis"
            id="colorXAxis"
            fullWidth
            type="number"
            value={props.properties.colorXAxis}
            onChange={(e) => handleChange(e.target.value, "colorXAxis")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Y-Axis"
            id="colorYAxis"
            fullWidth
            type="number"
            value={props.properties.colorYAxis}
            onChange={(e) => handleChange(e.target.value, "colorYAxis")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
    </FormControl>
  );
}
