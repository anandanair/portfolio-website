import { RotateRight } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { MuiColorInput } from "mui-color-input";
import React from "react";
import CustomSlider from "../CustomSlider";

export default function CustomColorPicker(props) {
  return (
    <React.Fragment>
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
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
        <CustomSlider
          icon={RotateRight}
          value={props.properties.colorAngle}
          max={360}
          onChange={(event, newValue) => props.onChange(newValue, "colorAngle")}
        />
      )}
      {props.properties.backgroundColorType === "radial-gradient" && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="X-Axis"
            id="colorXAxis"
            fullWidth
            type="number"
            value={props.properties.colorXAxis}
            onChange={(e) => props.onChange(e.target.value, "colorXAxis")}
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
            onChange={(e) => props.onChange(e.target.value, "colorYAxis")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
    </React.Fragment>
  );
}
